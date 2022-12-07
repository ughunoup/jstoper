<script lang="ts">
  export let ratio: number = 0;
  const defaultOffset = 219.91148575129;

  $: dashoffset =  defaultOffset - ratio * defaultOffset;
</script>

<svg class="radial-progress" viewBox="0 0 80 80">
    <circle class="incomplete" cx="40" cy="40" r="35"></circle>
    <circle
        data-testid="progress-circle"
        class="complete"
        cx="40"
        cy="40"
        r="35"
        style:stroke-dashoffset={dashoffset}
    ></circle>
</svg>


<style lang="scss">
	.radial-progress {
		height: auto;
		width: 20px;
		transform: rotate(-90deg);

		circle {
			fill: rgba(0, 0, 0, 0);
			stroke: #fff;
			stroke-dashoffset: 219.91148575129;
			stroke-width: 10;

			&.incomplete {
				opacity: 0.2;
			}

			&.complete {
				stroke-dasharray: 219.91148575129;
			}
		}
	}
</style>
