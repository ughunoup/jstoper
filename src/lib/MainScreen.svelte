<script lang="ts">
  import { Time } from './Time';
  import { numberToString } from './numberToString';
  import MainCounterValue from './MainCounterValue.svelte';
  import ProgressCircle from './ProgressCircle.svelte';

  export let time: Time = new Time(0);
  let animation = '';
  const onSecondChange = (value: number): void =>  {
    const animationTime = 500;
    animation = `blur-bounce ${animationTime / 1000}s normal forwards ease-out`;
    setTimeout(() => {
      animation = ''
      // keep this value the same as animation time in css section
    }, animationTime);
  }

  $: seconds = time.seconds;
  $: {
    onSecondChange(seconds);
  }

</script>

<div class="timer-wrapper" data-testid="timer">
    <div class="timer-shadow" style:animation></div>
    <div class="timer">
        <div class="numbers-wrapper">
            <div class="top-right">
                <ProgressCircle ratio={time.milliseconds / 1000}></ProgressCircle>
            </div>
            {#if time.hours}
                <MainCounterValue
                    value={numberToString(time.hours, '00')}
                    displayName="HOURS"
                    testId="hours"
                ></MainCounterValue>
                <div class="separator">
                    :
                </div>
            {/if}
            <MainCounterValue
                value={numberToString(time.minutes, '00')}
                displayName="MINUTES"
                testId="minutes"
            ></MainCounterValue>
            <div class="separator">
                :
            </div>
            <MainCounterValue
                value={numberToString(time.seconds, '00')}
                displayName="SECONDS"
                testId="seconds"
            ></MainCounterValue>
        </div>
    </div>
</div>


<style lang="scss">
    @import '../variables';
	$large-font: 74px;
	.timer-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;


	}

	.timer {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 2;
		margin: auto;
		background: radial-gradient(88.67% 967.47% at 2.04% 7.88%, #6595BD 0%, #74B2B0 100%);
		box-shadow: 0 5px 12px 5px rgba(21, 21, 21, 0.25);
		border-radius: 15px;
		padding: 50px;
	}

	.timer-shadow {
		width: 100%;
		height: 100%;
		border-radius: 15px;
		filter: blur(20px);
		position: absolute;
		top: 0;
		background: radial-gradient(88.67% 967.47% at 2.04% 7.88%, #6595BD 0%, #74B2B0 100%);

	}

	.separator {
		font-size: $large-font;
	}

	.numbers-wrapper {
		width: auto;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.top-right {
		position: absolute;
		left: calc(100% - 15px);
		top: 7px;
	}

	@keyframes -global-blur-bounce {
		0% {
			transform: scale(1);
		}
		10% {
			transform: scaleX(1.005) scaleY(1.01737);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
