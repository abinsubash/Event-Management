// redis.ts
import { createClient, RedisClientType } from 'redis';
import { env } from './env.config';

export let redisClient: RedisClientType;

export async function connectRedis(): Promise<void> {
  try {
    redisClient = createClient({
      username: 'default',
      password: env.REDIS_PASSWORD,
      socket: {
        host: env.REDIS_HOST,
        port: Number(env.REDIS_PORT),
      },
    });

    redisClient.on('error', (err: unknown) => {
      console.error('❌ Redis Client Error:', err);
    });

    await redisClient.connect();
    console.log('✅ Redis connected successfully');
  } catch (error) {
    console.error('❌ Failed to connect to Redis:', error);
  }
}
