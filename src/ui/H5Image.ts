module support{
    class H5Image extends eui.Image {

        public constructor() {
            super();
        }

        $onAddToStage(stage: egret.Stage, nestLevel: number): void{
            super.$onAddToStage(stage, nestLevel);
        }

        $onRemoveFromStage(): void {
            super.$onRemoveFromStage();
        }

        $setTexture(value: egret.Texture): boolean {
            let result: boolean = super.$setTexture(value);
            return result;
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            //todo
        }
    }
}