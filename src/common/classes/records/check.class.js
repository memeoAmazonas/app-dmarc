import _ from 'lodash';

import { theme } from 'src/theme';
import { Record } from './record.class';

export class Check {
  /**
   * Generates a ICheck based on an array of records passed in an the attrribute
   * that wants to be checked on the Record object
  */
  static checkFromRecords(records: Record[], propertyString: string): Check {
    const group = _.groupBy(records, propertyString);
    return new Check(
      Record.getRecordsValue(_.get(group, 'true', [])),
      Record.getRecordsValue(_.get(group, 'false', [])),
    );
  }

  percentFormattingOptions = {
    style: 'percent',
    maximumFractionDigits: 2,
  }

  constructor(pass: number, fail: number) {
    this.pass = pass;
    this.fail = fail;

    this.formatter = new Intl.NumberFormat('en-US', this.percentFormattingOptions);
  }

  getDataSets(colorPrimary, colorSecondary) {
    return [
      {
        backgroundColor: [
          colorPrimary || theme.colors.blue4,
          colorSecondary || theme.colors.blue5,
        ],
        data: [this.pass || 0, this.fail || 0],
      },
    ];
  }

  get total(): number {
    return this.pass + this.fail;
  }

  get percentagePassLabel(): string {
    return this.formatter.format(this.pass / this.total);
  }

  get percentageFailLabel(): string {
    return this.formatter.format(this.fail / this.total);
  }
}
