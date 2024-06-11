<script lang="ts">
	import type { UploadedFile } from '$lib/types';
	import { uploadedFiles } from '$lib/stores';
	import { handleDownload } from '$lib/utils';
	import { OutputSelect } from '$lib/components';
	import { IconDownload, IconSettings, IconX, IconLoader2 } from '@tabler/icons-svelte';

	export let itemIndex: number;
	export let uploadedFile: UploadedFile;
	export let setSettingsModalFileIndex: (index: number | null) => void;

	let downloadLoading = false;

	const handleRemoveItem = () => {
		const newUploadedFiles = $uploadedFiles.filter((_, i) => i !== itemIndex);
		uploadedFiles.set(newUploadedFiles);
	};

	const handleDownloadClick = async (uploadedFile: UploadedFile) => {
		downloadLoading = true;
		await handleDownload([uploadedFile]);
		downloadLoading = false;
	};
</script>

<li class="container">
	<div class="nameAndOutputContainer">
		<h3 class="filename" title={uploadedFile.file.name}>{uploadedFile.file.name}</h3>

		<OutputSelect {itemIndex} selectedOutput={uploadedFile.output} />
	</div>

	<div class="actionButtonsContainer">
		<button
			class={`downloadButton actionButton${downloadLoading ? ' loading' : ''}`}
			on:click={() => handleDownloadClick(uploadedFile)}
			aria-label="download image"
			disabled={downloadLoading}
		>
			{#if downloadLoading}
				<IconLoader2 />
			{:else}
				<IconDownload />
			{/if}
		</button>
		<button
			class="settingsButton actionButton"
			aria-label="open image settings"
			on:click={() => setSettingsModalFileIndex(itemIndex)}
		>
			<IconSettings />
		</button>
		<button
			class="removeButton actionButton"
			on:click={handleRemoveItem}
			aria-label="remove image"
		>
			<IconX />
		</button>
	</div>
</li>

<style>
	.container {
		display: flex;
		align-items: center;
		min-height: 3.5rem;
		padding: 0.5rem 1rem;
		border: solid 1px var(--secondary-bg);
		column-gap: 2rem;
		row-gap: 1rem;

		&:first-of-type {
			border-top-left-radius: 0.5rem;
			border-top-right-radius: 0.5rem;
		}
		&:last-of-type {
			border-bottom-left-radius: 0.5rem;
			border-bottom-right-radius: 0.5rem;
		}

		&:not(:last-of-type) {
			border-bottom: none;
		}
	}
	.nameAndOutputContainer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-grow: 1;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.filename {
		font-size: 1rem;
		min-width: min(5rem, 100%);
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.actionButtonsContainer {
		display: flex;
		align-items: center;
		gap: 0.65rem;
	}
	.actionButton {
		color: var(--secondary-text);
		width: 2rem;
		height: 2rem;
		outline-offset: 3px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: color 0.15s ease-in-out;

		&:not(:disabled):hover,
		&:focus-visible {
			color: var(--hover-color, var(--accent-color));
		}
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	.actionButton.downloadButton.loading {
		animation: spin 1s linear infinite;
		cursor: progress;
	}

	.actionButton.removeButton {
		--hover-color: var(--error-color);
	}

	@media screen and (max-width: 400px) {
		.container {
			padding: 0.5rem;
		}

		.actionButtonsContainer {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
