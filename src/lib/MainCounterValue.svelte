<script lang="ts">
    export let value: string;
    export let displayName: string;
    export let testId: string;
</script>

<div class="number-container">
    <span class="number" data-testid={testId}>
        {value}
    </span>
    <span class="number-description">
        {displayName}
    </span>
</div>

<style lang="scss">
	@import '../variables';

	.number-container{
		position: relative;
	}

	.number {
		display: block;
		padding: 0 20px;
		font-size: $large-font;
		line-height: 1;
		font-weight: 500;
		text-shadow: 0 4px 7px rgba(0, 0, 0, 0.25);
	}

	.number-description {
		position: absolute;
        left: 50%;
        top: 100%;
        transform: translateX(-50%);

		font-weight: 400;
		font-size: 13px;
        letter-spacing: 1px;
		text-transform: uppercase;

	}
</style>
