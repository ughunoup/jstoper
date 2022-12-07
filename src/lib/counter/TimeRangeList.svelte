<script lang="ts">
  import { Round } from './model/Round';
  import { slide } from 'svelte/transition';

  export let rounds: Round[] = [];
  export let maxCount = 4;
  let showAll: boolean = false;

  $: visibleRounds = showAll ? rounds : rounds.slice(0, maxCount);
</script>

<div class="container">
    <ol data-testid="ranges">
        <li class="row">
            <strong class="col header">Round</strong>
            <strong class="col header">Time</strong>
        </li>
        {#each visibleRounds as round, index}
            <li class="row" transition:slide>
                <span class="col">{rounds.length - index}</span>
                <span class="col">{round.timeSummary.toString('m+s')}</span>
            </li>
        {/each}
    </ol>
    {#if rounds.length > maxCount}
        <button on:click={() => showAll = !showAll} class:active={showAll}>
            {#if showAll}
                less
            {:else}
                more
            {/if}

            <svg class="icon" width="24px" height="24px" viewBox="0 0 24 24">
                <polyline class="shape" stroke-width="2" points="7.086 3.174 17.086 13.174 7.086 23.174"></polyline>
            </svg>
        </button>
    {/if}
</div>


<style lang="scss">
    .container{
		width: 100%;
        max-width: 250px;
    }

    ol {
        list-style-type: none;
    }

    .row {
        display: flex;
        align-items: flex-start;
		list-style-type: none;
		padding: 0.5rem 0;
        border-bottom: 1px solid #4f4f4f;

        &:last-child {
            border-bottom: none;
        }

		&:first-child {
			border-bottom: none;
		}
    }

    .col {
        display: block;
        text-align: center;
        flex: 0 0 50%;
		font-size: 1.125rem;
    }

    .header {
		font-size: 1.375rem;
		font-weight: 500;
    }

    button {
        margin: auto;
		background-color: transparent;
        color: white;
		font-size: 0.875rem;
        padding: 5px;
        text-transform: uppercase;
        cursor: pointer;

		display: flex;
        align-items: center;


        &.active {
            .icon{
				transform: rotate(-90deg) translateX(1px);
            }
        }

        .icon {
            transform: rotate(90deg) translateX(-1px);
			height: 14px;
			transition: transform 0.2s;
		}

        .shape {
            stroke: white;
        }
    }
</style>
