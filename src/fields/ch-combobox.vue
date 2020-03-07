<template>
	<v-combobox
			class="mb-3"
			v-model="value"
			:items="schema.items"
			:search-input.sync="search"
			hide-selected
			:hint="schema.hint"
			:label="schema.name"
			:required="schema.required"
			:readonly="schema.readonly"
			:disabled="schema.disabled"
			:item-text="schema.itemText"
			:item-value="schema.itemValue"
			multiple
			box
			persistent-hint
			hide-details
			small-chips
			v-bind="schema.attributes"
	>
		<template slot="no-data">
			<v-list-tile>
				<v-list-tile-content>
					<v-list-tile-title>
						No results for "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to add this item
					</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</template>
	</v-combobox>
</template>

<script>
	import { mixins } from './abstractField.js';

	export default {
		name: 'ch-combobox',
		mixins: [mixins],
		watch: {
			model(val) {
				if (val.length > 5) {
					this.$nextTick(() => this.model.pop());
				}
			},
		},
		data: () => ({
			search: null,
		}),
		methods: {
			onBlur() {
				this.$emit('blur');
			},
			onChange() {
				this.$emit('change');
			},
			onFocus() {
				this.$emit('focus');
			},
			onInput() {
				this.$emit('input');
			},
		},
	};
</script>
