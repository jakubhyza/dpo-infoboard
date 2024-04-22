interface CacheRecord<T> {
	value: T;
	createdAt: Date;
	timeout: NodeJS.Timeout;
}

class Cache<T> {
	private records: Record<string, CacheRecord<T>> = {};
	private maxAge: number;

	constructor(maxAge: number) {
		this.maxAge = maxAge;
	}

	set(key: string, value: T): void {
		this.records[key] = {
			value,
			createdAt: new Date(),
			timeout: setTimeout(() => {
				if (this.records[key]) {
					delete this.records[key];
				}
			}),
		};
	}

	get(key: string): T | undefined {
		const record = this.records[key];
		if (!record) {
			return;
		}
		const now = new Date();
		const age = now.getTime() - record.createdAt.getTime();
		if (age > this.maxAge) {
			clearTimeout(record.timeout);
			delete this.records[key];
			return;
		}
		return record.value;
	}

	remove(key: string): void {
		if (this.records[key]) {
			clearTimeout(this.records[key].timeout);
			delete this.records[key];
		}
	}

	clear(): void {
		Object.values(this.records).forEach((record) => {
			clearTimeout(record.timeout);
		});
		this.records = {};
	}

	get size(): number {
		return Object.keys(this.records).length;
	}

	get keys(): string[] {
		return Object.keys(this.records);
	}
}

export default Cache;
