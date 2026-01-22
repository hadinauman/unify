import axios from 'axios';

interface SlackMessage {
  channel: string;
  user: string;
  text: string;
  ts: string;
  thread_ts?: string;
}

interface SlackUser {
  id: string;
  real_name: string;
  name: string;
}

interface SlackChannel {
  id: string;
  name: string;
  topic?: { value: string };
  purpose?: { value: string };
}

let slackToken: string | null = null;

export class SlackService {
  /**
   * Initialize with API token
   */
  static setToken(token: string): void {
    slackToken = token;
  }

  /**
   * Get the current token
   */
  static getToken(): string | null {
    return slackToken;
  }

  /**
   * Check if connected
   */
  static isConnected(): boolean {
    return !!slackToken;
  }

  /**
   * Verify token is valid by testing auth
   */
  static async verifyToken(): Promise<boolean> {
    if (!slackToken) return false;

    try {
      const response = await axios.get('https://slack.com/api/auth.test', {
        headers: { Authorization: `Bearer ${slackToken}` },
      });

      return response.data.ok;
    } catch (error) {
      console.error('Failed to verify Slack token:', error);
      return false;
    }
  }

  /**
   * Disconnect (clear token)
   */
  static disconnect(): void {
    slackToken = null;
  }

  /**
   * Get all channels
   */
  static async getChannels(): Promise<SlackChannel[]> {
    if (!slackToken) {
      throw new Error('Slack not connected');
    }

    try {
      const response = await axios.get('https://slack.com/api/conversations.list', {
        headers: { Authorization: `Bearer ${slackToken}` },
        params: {
          types: 'public_channel,private_channel',
          limit: 100,
          exclude_archived: true,
        },
      });

      if (!response.data.ok) {
        throw new Error(`Slack API error: ${response.data.error}`);
      }

      return response.data.channels || [];
    } catch (error) {
      console.error('Failed to fetch Slack channels:', error);
      throw error;
    }
  }

  /**
   * Get all workspace users
   */
  static async getUsers(): Promise<SlackUser[]> {
    if (!slackToken) {
      throw new Error('Slack not connected');
    }

    try {
      const response = await axios.get('https://slack.com/api/users.list', {
        headers: { Authorization: `Bearer ${slackToken}` },
        params: { limit: 100 },
      });

      if (!response.data.ok) {
        throw new Error(`Slack API error: ${response.data.error}`);
      }

      // Filter out bots and excluded users
      return (response.data.members || []).filter(
        (user: any) => !user.is_bot && !user.deleted && user.id !== 'USLACKBOT'
      );
    } catch (error) {
      console.error('Failed to fetch Slack users:', error);
      throw error;
    }
  }

  /**
   * Get messages from a channel (last N days)
   */
  static async getChannelMessages(
    channelId: string,
    daysBack: number = 30
  ): Promise<SlackMessage[]> {
    if (!slackToken) {
      throw new Error('Slack not connected');
    }

    try {
      // Calculate timestamp for N days ago
      const daysAgoMs = Date.now() - daysBack * 24 * 60 * 60 * 1000;
      const daysAgoSeconds = Math.floor(daysAgoMs / 1000);

      const response = await axios.get('https://slack.com/api/conversations.history', {
        headers: { Authorization: `Bearer ${slackToken}` },
        params: {
          channel: channelId,
          oldest: daysAgoSeconds,
          limit: 100,
        },
      });

      if (!response.data.ok) {
        throw new Error(`Slack API error: ${response.data.error}`);
      }

      return response.data.messages || [];
    } catch (error) {
      console.error(`Failed to fetch messages from ${channelId}:`, error);
      throw error;
    }
  }

  /**
   * Get thread replies
   */
  static async getThreadReplies(
    channelId: string,
    threadTs: string
  ): Promise<SlackMessage[]> {
    if (!slackToken) {
      throw new Error('Slack not connected');
    }

    try {
      const response = await axios.get(
        'https://slack.com/api/conversations.replies',
        {
          headers: { Authorization: `Bearer ${slackToken}` },
          params: {
            channel: channelId,
            ts: threadTs,
            limit: 100,
          },
        }
      );

      if (!response.data.ok) {
        throw new Error(`Slack API error: ${response.data.error}`);
      }

      return response.data.messages || [];
    } catch (error) {
      console.error(`Failed to fetch thread ${threadTs}:`, error);
      throw error;
    }
  }

  /**
   * Fetch all Slack data (channels, users, messages)
   */
  static async fetchAllData(daysBack: number = 30): Promise<{
    channels: SlackChannel[];
    users: SlackUser[];
    messages: SlackMessage[];
  }> {
    if (!slackToken) {
      throw new Error('Slack not connected');
    }

    console.log('🔄 Fetching Slack data...');

    try {
      // Fetch channels and users in parallel
      const [channels, users] = await Promise.all([
        this.getChannels(),
        this.getUsers(),
      ]);

      console.log(`📊 Found ${channels.length} channels and ${users.length} users`);

      // Fetch messages from each channel
      const allMessages: SlackMessage[] = [];
      for (const channel of channels) {
        try {
          const messages = await this.getChannelMessages(channel.id, daysBack);
          console.log(`📨 Fetched ${messages.length} messages from #${channel.name}`);
          allMessages.push(...messages);

          // For messages with threads, fetch thread replies
          for (const message of messages) {
            if (message.thread_ts && message.ts === message.thread_ts) {
              try {
                const threadReplies = await this.getThreadReplies(
                  channel.id,
                  message.thread_ts
                );
                // Skip the first message (it's a duplicate)
                allMessages.push(...threadReplies.slice(1));
              } catch (err) {
                console.warn(`Failed to fetch thread for ${message.ts}:`, err);
              }
            }
          }
        } catch (err) {
          console.warn(`Failed to fetch messages from #${channel.name}:`, err);
        }
      }

      console.log(`✅ Total messages fetched: ${allMessages.length}`);

      return { channels, users, messages: allMessages };
    } catch (error) {
      console.error('Failed to fetch Slack data:', error);
      throw error;
    }
  }
}
