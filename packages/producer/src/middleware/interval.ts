import { Handle } from '@dojo/framework/core/Destroyable';
import { uuid } from '@dojo/framework/core/util';
import { create, destroy } from '@dojo/framework/core/vdom';

const factory = create({ destroy });

export const interval = factory(function({ middleware: { destroy }}) {
	const map: Map<string, Handle> = new Map();

	destroy(() => {
		for (const handle of map.values()) {
			handle.destroy();
		}
		map.clear();
	});

	return function (callback: () => void, milliseconds: number, name: string = uuid(), callImmediate: boolean = false) {
		if (!map.has(name)) {
			const interval = setInterval(callback, milliseconds);
			const handle = {
				destroy() {
					map.delete(name);
					if (typeof interval === 'number') {
						clearInterval(interval);
					}
					else {
						(interval as any).unref();
					}
				}
			}
			map.set(name, handle);
			if (callImmediate) {
				callback();
			}
			return handle;
		}
	};
});
