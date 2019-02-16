module support{
    class H5Label extends eui.Label {

        private static htmlTextParser = new egret.HtmlTextParser();

        public constructor() {
            super();
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            
        }

        public set htmlText(text:string){
            this.textFlow = H5Label.htmlTextParser.parser(text);
        }

        public set lanCode(code:number){
            this.htmlText = support.LanBus.instance().getBindStr(code);
        }

        public set htmlLanCode(code:number){
            this.htmlText = support.LanBus.instance().getStr(code);
        }
    }
}