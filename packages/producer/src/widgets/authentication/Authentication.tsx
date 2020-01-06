import { create, tsx } from '@dojo/framework/core/vdom';
import TextInput from '@dojo/widgets/text-input'
import Control from '../control/Control';

export interface AuthenticationProperties {
	secret: string;
	onChange?: (value: string) => void;
	onSubmit?: (value: string) => void;
}

const factory = create({}).properties<AuthenticationProperties>();

export default factory(function Authentication({ properties }){
	const { secret, onSubmit, onChange } = properties();

	return (<div>
		<TextInput value={secret} onChange={(value) => { onChange?.(value as string) }} placeholder="Secret" type="password" />
		<Control title="Authenticate" show={true} onClick={() => { onSubmit?.(secret) }} />
	</div>);
});
