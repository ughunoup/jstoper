<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Time } from './Time';
  import { TimeRange } from './TimeRange';
  import { Round } from './Round';
  import Button from './Button.svelte';
  import TimeRangeList from './TimeRangeList.svelte';
  import { onDestroy } from 'svelte';
  import MainScreen from './MainScreen.svelte';

  export let refreshRateInMs = 10;

  // todo move refreshing logic to store


  let running: boolean = false;
  let interval: NodeJS.Timer;
  let rounds: Round[];
  const storageKey = 'timer';

  if(localStorage.getItem(storageKey)) {
    const items = JSON.parse(localStorage.getItem(storageKey));
    rounds = items.map((i) => Round.fromObject(i));
  } else {
    rounds = [new Round()]
  }



  $: multipleRounds = rounds.length > 1;
  $: currentRange = rounds[rounds.length - 1];
  $: summary = rounds.reduce(
    (acc, timeRange) => {
      return acc.add(timeRange.timeSummary);
    },
    new Time(0)
  );

  const refresh = () => {
    currentRange.setEnd(new Date())
    rounds = rounds;
    localStorage.setItem(storageKey, JSON.stringify(rounds));
  }

  const startRefreshing = () => {
    interval = setInterval(refresh, refreshRateInMs);
    running = true;
  }

  const stopRefreshing = () => {
    clearInterval(interval);
    running = false;
  }

  const stopTimer = () => {
    refresh();
    stopRefreshing();
    localStorage.setItem('running', `${running}`)
  }

  const startTimer = () => {
    currentRange.addRange(
      new TimeRange(new Date(), new Date())
    );
    startRefreshing()
    localStorage.setItem('running', `${running}`)
  }

  const reset = () => {
    clearInterval(interval);
    rounds = [new Round()];
    summary = new Time(0);
    localStorage.removeItem(storageKey);
  }

  const addRound = () => {
    const pointOfContact = new Date(new Date().getTime() - currentRange.timeSummary.milliseconds);
    currentRange.lastRange.setEnd(pointOfContact)
    rounds = [
      ...rounds,
      new Round([
        new TimeRange(
          pointOfContact,
          new Date()
        )
      ])
    ];
  }

  onDestroy(() => {
    clearInterval(interval);
  });

  if(JSON.parse(localStorage.getItem('running'))) {
    startRefreshing();
  }
</script>

<svelte:head>
    <title>JStoper - {currentRange.timeSummary.toString('m+s')}</title>
</svelte:head>

<div class="container">
    <div class="content">
        {#if multipleRounds}
            <div class="summary-time" data-testid="summary-time" transition:fade>
               {summary.toString()}
            </div>
        {/if}
        <MainScreen time={currentRange.timeSummary}></MainScreen>
        <div class="buttons">
            <Button type="primary" on:click={running ? stopTimer : startTimer}>
                {#if running}
                    Stop
                {:else}
                    Start
                {/if}
            </Button>

            <Button type="secondary" data-testid="round-button" on:click={running ? addRound : reset}>
                {#if running}
                    Round
                {:else}
                    Reset
                {/if}
            </Button>
        </div>

        {#if rounds.length > 1}
            <div class="ranges">
                <TimeRangeList rounds={[...rounds].reverse()}></TimeRangeList>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
	@import '../variables';

	.container {
		width: 100%;
		height: 100%;
		max-width: 1200px;
		padding-top: calc(50vh - 185px / 2);
		margin: auto;
		display: flex;
		align-items: center;
		flex-direction: column;
		position: relative;
	}

	.content {
		position: relative;
		width: $main-counter-width;
		height: $main-counter-height;

		@media (max-width: $main-counter-width + $page-padding*2) {
			width: 100%;
			//height: calc($main-counter-height / $main-counter-width * 100%);
		}
	}

	.buttons {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.summary-time {
		font-size: 30px;
		text-align: right;

		font-weight: 100;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);

		position: absolute;
		bottom: 100%;
		right: 0;
		padding-bottom: 15px;
		z-index: 2;

	}
</style>
