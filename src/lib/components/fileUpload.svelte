<script lang="ts">
	import {
		supportedImageOutputTypes,
		supportedImageInputTypes,
		type UploadedFile
	} from '$lib/types';
	import { uploadedFiles } from '$lib/stores';
	import { IconFileUpload } from '@tabler/icons-svelte';

	export let iconSize = 0;

	// TODO: allow zip files
	const validMimeTypes = supportedImageInputTypes.map(
		(type) => type.mimeType
	) as string[];

	let fileInput: HTMLInputElement;
	let isDraggingOver = false;

	const addUploadedFiles = (files: File[]) => {
		const newFiles: UploadedFile[] = files.map((file) => {
			return {
				file,
				output:
					supportedImageInputTypes.find((type) => type.mimeType === 'image/png')
						?.extension || supportedImageOutputTypes[0].extension,
				resolutionMultiplier: {
					width: 1,
					height: 1
				}
			};
		});

		const mergedFiles = [...newFiles, ...$uploadedFiles];

		uploadedFiles.set(mergedFiles);
	};

	const handleInput = async (files: File[]) => {
		const filesToUpload: File[] = [];
		const filesToNotUpload: File[] = [];
		for (const file of files || []) {
			if (validMimeTypes.includes(file.type)) {
				if (true) {
					// TODO check if file if zip, if it is unzip and add check if files are valid recursively
				}
				filesToUpload.push(file);
			} else {
				filesToNotUpload.push(file);
			}
		}

		// TODO: error message
		if (filesToNotUpload.length) {
			console.log('These files are not supported: ', filesToNotUpload);
		}

		addUploadedFiles(filesToUpload);
	};

	const handleFileDrag = (e: DragEvent) => {
		e.preventDefault();
		isDraggingOver = e.type === 'dragover';
	};

	const handleFileDrop = (e: DragEvent) => {
		e.preventDefault();

		if (e.dataTransfer) {
			fileInput.files = e.dataTransfer.files;
			fileInput.dispatchEvent(new Event('input'));
		}
	};
</script>

<input
	class="input"
	on:input={(e) => handleInput(Array.from(e.currentTarget.files || []))}
	bind:this={fileInput}
	id="file_input"
	name="file_input"
	multiple
	type="file"
	accept={validMimeTypes.join(',')}
/>
<label
	for="file_input"
	class={`${$$restProps.class}
  ${isDraggingOver ? ' draggingOver' : ''} label`}
	on:dragover={handleFileDrag}
	on:dragend={handleFileDrag}
	on:dragleave={handleFileDrag}
	on:drop={handleFileDrop}
>
	{#if iconSize}
		<IconFileUpload
			class={`${$$restProps.iconClass} icon`}
			stroke={1.5}
			size={iconSize}
		/>
	{/if}
	<slot />
</label>

<style>
	.label {
		cursor: pointer;
		position: relative;
		overflow: hidden;
		display: flex;
		width: fit-content;
		align-items: center;
		justify-content: center;
	}
	.input {
		position: absolute;
		background-color: red;
		position: absolute;
		left: calc(-100vw - 1px);
		width: 1px;
		height: 1px;
		overflow: hidden;

		&:focus-visible + .label {
			outline: dashed 3px var(--accent-color);
			outline-offset: 3px;
		}
	}
	.icon {
		width: 2rem;
	}
</style>
