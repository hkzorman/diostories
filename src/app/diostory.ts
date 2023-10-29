export class DiostoryPanel {
    text: string;
    imageUrl: string;

    constructor(text: string, imageUrl: string) {
        this.text = text;
        this.imageUrl = imageUrl;
    }
}

export class Diostory {
    id?: number;
    title: string;
    private panels: DiostoryPanel[];
    private currentIdx: number;

    constructor(title: string) {
        this.title = title;
        this.panels = new Array<DiostoryPanel>();
        this.currentIdx = 0;
    }

    addPanel(text: string, image: string): void {
        this.panels.push(new DiostoryPanel(text, image));
    }

    removePanel(): void {
        this.panels.splice(this.currentIdx, 1);
    }

    firstPanel(): DiostoryPanel {
        this.currentIdx = 0;
        return this.panels[0];
    }

    nextPanel(): DiostoryPanel | undefined {
        let nextIndex = this.currentIdx + 1;
        if (nextIndex >= this.panels.length) {
            return undefined;
        }
        else {
            return this.panels[++this.currentIdx];
        }
    }

    prevPanel(): DiostoryPanel | undefined {
        let prevIndex = this.currentIdx - 1;
        if (prevIndex < 0) {
            return undefined;
        }
        else {
            return this.panels[--this.currentIdx];
        }
    }

    getPanelCount(): number {
        return this.panels.length;
    }

    getCurrentPanelIndex(): number {
        return this.currentIdx + 1;
    }

    static fromObject(object: any): Diostory {
        let result = new Diostory(object.title);
        result.id = object.id;
        result.panels = object.panels;
        return result;
    }

    clone(): Diostory {
        let result = new Diostory(this.title);
        for (let panel of this.panels) {
            result.addPanel(panel.text, panel.imageUrl);
        }
        result.currentIdx = this.currentIdx;

        return result;
    }
}