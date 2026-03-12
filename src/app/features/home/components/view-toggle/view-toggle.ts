import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ViewMode } from '../home-page/home-page';

@Component({
    selector: 'app-view-toggle',
    standalone: true,
    templateUrl: './view-toggle.html',
    styleUrls: ['./view-toggle.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewToggle {
    // Входные данные
    mode = input.required<ViewMode>();

    // Выходные события
    modeChange = output<ViewMode>();

    protected setMode(mode: ViewMode): void {
        if (this.mode() !== mode) {
            this.modeChange.emit(mode);
        }
    }
}
