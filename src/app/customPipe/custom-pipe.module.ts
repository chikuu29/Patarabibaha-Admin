import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperatureConverterPipe } from './temperature-converter.pipe';
import { SpeedMeasurementPipe } from './speed-measurement.pipe';
import { FormatdropdownPipe } from './formatdropdown.pipe';
import { SafeUrlPipePipe } from './safe-url-pipe.pipe';
import { AgePipe } from './age.pipe';
// import { CurrencyToWordsPipe } from './currency-to-words.pipe';



@NgModule({
  declarations: [
    TemperatureConverterPipe,
    SpeedMeasurementPipe,
    FormatdropdownPipe,
    SafeUrlPipePipe,
    AgePipe
    //CurrencyToWordsPipe

  ],
  imports: [
    CommonModule
  ],
  exports: [
    TemperatureConverterPipe,
    SpeedMeasurementPipe,
    FormatdropdownPipe,
    SafeUrlPipePipe,
    AgePipe,
    //CurrencyToWordsPipe
  ]
})
export class CustomPipeModule { }
