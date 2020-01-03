import { createProcess, DefaultPayload, Commands, ProcessCallback, Process } from '@dojo/framework/stores/process';

export type NamedProcess<T = any, P extends object = DefaultPayload> = Process<T, P> & { id: string };

export function createNamedProcess<T = any, P extends object = DefaultPayload>(id: string, commands: Commands<T, P>, callbacks?: ProcessCallback | ProcessCallback[]): NamedProcess<T, P> {
	const process = createProcess(id, commands, callbacks) as NamedProcess<T, P>;
	process.id = id;
	return process;
}
