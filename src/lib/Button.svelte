<script lang="ts">
    export let type: 'primary' | 'seconadary' | 'active' = 'primary';
</script>

<button class={type} data-testid={$$props['data-testid']} on:click>
    <slot></slot>
</button>


<style lang="scss">
    @import '../variables';
	button {
		padding: 0.625rem 1.25rem;
		margin: 20px 10px;
		position: relative;
		box-shadow: 0 5px 12px 5px rgba(21, 21, 21, 0.25);
		font-weight: 500;
		border-radius: 10px;
		text-transform: uppercase;
		color: #ffffff;
		transform-style: preserve-3d;
		text-shadow: 0 2px 1px rgba(0, 0, 0, 0.25);
		transform: perspective(1px) translateZ(0);
		backface-visibility: hidden;
        transition: background-color 0.2s;

        @media (max-width: $sm-breakpoint) {
			padding: 0.325rem 1.25rem;
            border-radius: 7px;
			margin: 20px 7px;
		}

		&.primary {
			background: rgba(101, 149, 189, 1);

            &:hover{
				background: rgba(101, 149, 189, 0.8);
            }
        }

        &.secondary {
			background: rgba(116, 178, 176, 1);

			&:hover{
				background: rgba(116, 178, 176, 0.8);
			}
        }

        &.active {
            background: #008A5B;
        }

		&:hover {
			cursor: pointer;
		}
	}
</style>
