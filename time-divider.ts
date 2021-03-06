export class TimeDivider {
  startTime: number;
  endTime: number;

  constructor(startTime: number, endTime: number = Date.now()) {
    this.startTime = startTime;
    this.endTime = endTime;
  }

  divide(
    interval: number,
    unit: Units = Units.Millisecond,
  ): {
    start: number;
    end: number;
  }[] {
    const chunks: {
      start: number;
      end: number;
    }[] = [];
    for (let currTime = this.startTime; currTime < this.endTime; ) {
      const next = this._add(currTime, interval, unit);
      chunks.push({
        start: currTime,
        end: Math.min(next, this.endTime) - 1,
      });
      currTime = next;
    }
    return chunks;
  }

  private _add(time: number, interval: number, unit: Units) {
    return this[unit](time, interval);
  }

  private _addMillisecond(time: number, interval: number) {
    return time + interval;
  }

  private _addSeconde(time: number, interval: number) {
    return time + interval * 1000;
  }

  private _addMinute(time: number, interval: number) {
    return time + interval * 1000 * 60;
  }

  private _addHour(time: number, interval: number) {
    return time + interval * 1000 * 60 * 60;
  }

  private _addDay(time: number, interval: number) {
    return time + interval * 1000 * 60 * 60 * 24;
  }

  private _addWeek(time: number, interval: number) {
    return time + interval * 1000 * 60 * 60 * 24 * 7;
  }

  private _addMonth(time: number, interval: number) {
    return new Date(
      new Date(time).setMonth(new Date(time).getMonth() + interval),
    ).getTime();
  }

  private _addYear(time: number, interval: number) {
    return new Date(
      new Date(time).setFullYear(new Date(time).getFullYear() + interval),
    ).getTime();
  }
}

export enum Units {
  Millisecond = '_addMillisecond',
  Second = '_addSeconde',
  Minute = '_addMinute',
  Hour = '_addHour',
  Day = '_addDay',
  Week = '_addWeek',
  Month = '_addMonth',
  Year = '_addYear',
}
