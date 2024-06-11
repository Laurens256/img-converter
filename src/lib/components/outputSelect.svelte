<script lang="ts">
	import { uploadedFiles } from '$lib/stores';
	import {
		supportedImageOutputTypes,
		type SupportedImageOutputExtension
	} from '$lib/types';
	import { trapFocus } from '$lib/utils';

	export let itemIndex: number;
	export let selectedOutput: SupportedImageOutputExtension | null;

	let outputMenuOpen = false;

	const imageExtensions = Object.values(supportedImageOutputTypes).map(
		(obj) => obj.extension
	);

	const toggleMenu = () => {
		outputMenuOpen = !outputMenuOpen;
	};

	const handleOutputChange = (output: string) => {
		const newUploadedFiles = $uploadedFiles.map((file, index) => {
			if (index === itemIndex || itemIndex === -1) {
				return {
					...file,
					output: output as SupportedImageOutputExtension
				};
			}
			return file;
		});
		uploadedFiles.set(newUploadedFiles);
		toggleMenu();
	};
</script>

<div class="container">
	<button on:click={toggleMenu}>{itemIndex === -1 ? 'Convert all to:' : 'Output:'} {selectedOutput}</button>

	<div
		class="outputPopover"
		class:active={outputMenuOpen}
		use:trapFocus={{ isActive: outputMenuOpen, onClose: toggleMenu }}
	>
		{#each imageExtensions as extension}
			<button on:click={() => handleOutputChange(extension)}>{extension}</button>
		{/each}
	</div>
</div>


<style>
	.container {
		position: relative;
	}
	/* .select {
		appearance: none;
		background-color: transparent;
		border: solid 1px var(--accent-color);
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		min-width: 6rem;
	} */

	.outputPopover {
		display: none;
		background-color: red;
		position: absolute;
		/* top: 100%;
		right: 0; */

		&.active {
			display: block;
		}
	}
</style>
