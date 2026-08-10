const hits=new Map<string,{count:number;reset:number}>();
export function rateLimit(key:string,limit=5,windowMs=60_000){const now=Date.now(),entry=hits.get(key);if(!entry||entry.reset<now){hits.set(key,{count:1,reset:now+windowMs});return true}if(entry.count>=limit)return false;entry.count++;return true}
