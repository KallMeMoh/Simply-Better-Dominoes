import type { Request } from 'express';

export default async function getGeolocationInfo(req: Request): Promise<{
  ip_address: string;
  city: string;
  country: string;
}> {
  const ip_address =
    (req.headers['x-forwarded-for'] as string | undefined)
      ?.split(',')[0]
      ?.trim() ||
    (req.headers['x-real-ip'] as string | undefined) ||
    req.ip;

  if (
    ip_address &&
    ip_address !== '::1' &&
    ip_address !== '127.0.0.1' &&
    !ip_address.startsWith('::ffff:127.')
  ) {
    try {
      const geoResponse = await fetch(`http://ip-api.com/json/${ip_address}`);
      const payload = await geoResponse.json();

      if (payload.status !== 'success') throw new Error(payload.message);

      return {
        ip_address,
        city: payload.city ?? 'Unkown',
        country: payload.country ?? 'Unkown',
      };
    } catch (error: any) {
      console.error({ message: error.message ?? 'Geolocation failed', error });

      return { ip_address, city: 'Unkown', country: 'Unkown' };
    }
  }

  return { ip_address: 'Unkown', city: 'Unkown', country: 'Unkown' };
}
