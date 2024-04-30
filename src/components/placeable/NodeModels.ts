export type Shape = {
    x : number | string;
    y : number | string;
    label : string;
    color : string;
    type : "source" | "pool" | "gate" | "text" | "trader" | "converter" | "drain" | "end";
};

export type NodeEditor = {
    label : string;
    action: "rename" | "delete" | "recolor" | "move";
};

export abstract class ConnectionObject{
    readonly startX : number;
    readonly startY : number;
    readonly endX : number;
    readonly endY : number;
    readonly color: string;
    hoveringOver: boolean;

    constructor(startX : number, startY : number, endX : number, endY : number, color: string){
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.color=color;
        this.hoveringOver = false;
    }

    abstract renderNode() : string;
}

export abstract class NodeObject {
    editorShowing : boolean;
    x : number;
    y : number;
    label : string;
    color : string;
    nodeEditor : NodeEditor[];
    size: number;
    hoveringOver: boolean;
    type : string;
    activationMode: number;
    constructor(x : number, y : number, type : string, color : string, size: number, activationMode: number) {
        this.editorShowing = false;
        this.x = x;
        this.y = y;
        this.label = type;
        this.type = type;
        this.color = color;
        this.size = size;
        this.hoveringOver = false;
        this.activationMode = activationMode;
        this.nodeEditor=[
            {
                label: "Rename",
                action: "rename",
            },
            {
              label: "Delete",
              action: "delete",
            },
            {
              label: "Recolor",
              action: "recolor",
            },
            {
              label: "Move",
              action: "move",
            },
        ];
    }


    //methods

    public menuSelection(action: "rename" | "delete" | "recolor" | "move", deleteCallback: (shape: NodeObject) => void) {
        switch(action){
            case "delete":
                this.delete(deleteCallback);
                break;
            case "rename":
                this.rename();
                break;
            case "recolor":
                this.recolor();
                break;
            case "move":
                this.move();
                break
            default:
                break;
        }
    }

    //menu methods

    public rename(){
        console.log("selected rename");
    }
    public recolor(){
        console.log("selected recolor");
    }
    public delete(deleteCallback: (shape: NodeObject) => void) {
        deleteCallback(this);
      }
    public move(){
        console.log("selected move");
    }

    //abstract methods

    abstract renderNode() : string;
}

export class Source extends NodeObject{
    renderNode(): string {
        let svg = `<g width="46" height="46" transform="translate(${this.x}, ${this.y}) scale(${this.size})">`;
        if(this.hoveringOver)
            {   
                svg = svg + `<path d="M 0.5 21.2 L 23.5 21.2 L 12 0.5 Z" fill="none" stroke="#4286f4" stroke-opacity="0.8" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" pointer-events="stroke">
                </path>
                <path d="M 19.2 5.8 L 21.2 2.8 L 23.2 5.8 M 21.2 -0.2 L 21.2 2.8 L 18.2 1.3 M 21.2 2.8 L 24.2 1.3" fill="none" stroke="#4286f4" stroke-opacity="0.8" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" pointer-events="stroke">
                </path>`;
            }
        svg = svg + `<path d="M 19.2 5.8 L 21.2 2.8 L 23.2 5.8 M 21.2 -0.2 L 21.2 2.8 L 18.2 1.3 M 21.2 2.8 L 24.2 1.3" fill="none" stroke="white" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" pointer-events="stroke" visibility="hidden" stroke-width="9">
                    </path>
                    <path d="M 19.2 5.8 L 21.2 2.8 L 23.2 5.8 M 21.2 -0.2 L 21.2 2.8 L 18.2 1.3 M 21.2 2.8 L 24.2 1.3" fill="none" stroke="#000000" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10">
                    </path>
                    <path d="M 0.5 21.2 L 23.5 21.2 L 12 0.5 Z" fill="#ffffff" stroke="#000000" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" pointer-events="all">
                    </path>
                    </g>`;
        return svg;
    }
}

export class Converter extends NodeObject{
    renderNode(): string {
        let svg = `<g width="46" height="46" transform="translate(${this.x}, ${this.y}) scale(${this.size})">`;
        if(this.hoveringOver)
            {   
                svg = svg + `<path d="M 0.5 23.5 L 0.5 0.5 L 21.2 12 Z M 12 23.5 L 12 0.5 Z" fill="none" stroke="#4286f4" stroke-opacity="0.8" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" pointer-events="stroke">
                            </path>`;
            }
        svg = svg + `<path d="M 0.5 23.5 L 0.5 0.5 L 21.2 12 Z M 12 23.5 L 12 0.5 Z" fill="#ffffff" stroke="#000000" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" pointer-events="all">
                    </path>
                    </g>`;
        return svg;
    }
}

export class Drain extends NodeObject{
    renderNode(): string {
        let svg = `<g width="46" height="46" transform="translate(${this.x}, ${this.y}) scale(${this.size})">`;
        if(this.hoveringOver)
            {   
                svg = svg + `<path d="M 0.5 0.5 L 23.5 0.5 L 12 21.2 Z" fill="#ffffff" fill="none" stroke="#4286f4" stroke-opacity="0.8" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" pointer-events="stroke">
                            </path>`;
            }
        svg = svg + `<path d="M 0.5 0.5 L 23.5 0.5 L 12 21.2 Z" fill="#ffffff" stroke="#000000" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" pointer-events="all">
                    </path>
                    </g>`;
        return svg;
    }
}

export class EndCondition extends NodeObject{
    renderNode(): string {
        let svg = `<g width="46" height="46" transform="translate(${this.x}, ${this.y}) scale(${this.size})">`;
        if(this.hoveringOver)
            {   
                svg = svg + `<rect x="2.8" y="2.8" width="18.4" height="18.4" fill="none" stroke="#4286f4" stroke-width="5" pointer-events="all">
                            </rect>
                            <rect x="6.25" y="6.25" width="11.5" height="11.5" fill="none" stroke="#4286f4" stroke-width="5" pointer-events="all">
                            </rect>`;
            }
        svg = svg + `<rect x="2.8" y="2.8" width="18.4" height="18.4" fill="#ffffff" stroke="#000000" pointer-events="all">
                    </rect>
                    <rect x="6.25" y="6.25" width="11.5" height="11.5" fill="#000000" stroke="#000000" pointer-events="all">
                    </rect>
                    </g>`;
        return svg;
    }
}

export class Gate extends NodeObject{
    renderNode(): string {
        let svg = `<g width="46" height="46" transform="translate(${this.x}, ${this.y}) scale(${this.size})">`;
        if(this.hoveringOver)
            {   
                svg = svg + `<path d="M 12 0.5 L 0.5 12 L 12 23.5 L 23.5 12 Z" fill="none" stroke="#4286f4" stroke-opacity="0.8" stroke-width="5" pointer-events="stroke">
                            </path>`;
            }
        svg = svg + `<path d="M 12 0.5 L 0.5 12 L 12 23.5 L 23.5 12 Z" fill="#ffffff" stroke="#000000" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" pointer-events="all">
                    </path>
                    </g>`;
        return svg;
    }
}

export class Pool extends NodeObject{
    renderNode(): string {
        let svg = `<g width="46" height="46" transform="translate(${this.x}, ${this.y}) scale(${this.size})">`;
        if(this.hoveringOver)
            {   
                svg = svg + `<ellipse cx="12" cy="12" rx="11.5" ry="11.5" fill="none" stroke="#4286f4" stroke-opacity="0.8" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" pointer-events="stroke">
                            </ellipse>`;
            }
        svg = svg + `<ellipse cx="12" cy="12" rx="11.5" ry="11.5" fill="#ffffff" stroke="#000000" pointer-events="all">
                    </ellipse>
                    </g>`;
        return svg;
    }
}

export class TextComponent extends NodeObject{
    renderNode(): string {
        if(this.hoveringOver){
            return `<g width="46" height="46" transform="translate(${this.x}, ${this.y}) scale(${this.size})" >
            <circle cx="10" cy="10" r="${this.size}" stroke="${this.color}" stroke-width="2" fill="transparent" />
            <circle cx="10" cy="10" r="${this.size+2}" stroke="#00b36b" stroke-width="2" fill="transparent" />
            <text x="5" y="17" font-family="Consolas" font-size="20" fill="${this.color}" style="user-select none;">I</text>
            </g>  `;
        }
        return `<g width="46" height="46" transform="translate(${this.x}, ${this.y}) scale(${this.size})" >
        <text style="color: black" x="8" y="18">T</text>
        <path fill-opacity="0" stroke="black" stroke-width="1" d="M 3,3 L 23,3 L 23,23 L 3,23 Z" stroke-dasharray="7.5,1.6"/>
              </g>  `;
    }
}

export class Trader extends NodeObject{
    renderNode(): string {
        let svg = `<g width="46" height="46" transform="translate(${this.x}, ${this.y}) scale(${this.size})">`;
        if(this.hoveringOver)
            {   
                svg = svg + `<path d="M 12 23.5 L 12 0.5 M 0.5 0.5 L 0.5 14.3 L 23.5 7.4 Z M 23.5 23.5 L 23.5 9.7 L 0.5 16.6 Z" fill="none" stroke="#4286f4" stroke-opacity="0.8" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" pointer-events="stroke">
                            </path>`;
            }
        svg = svg + `<path d="M 12 23.5 L 12 0.5 M 0.5 0.5 L 0.5 14.3 L 23.5 7.4 Z M 23.5 23.5 L 23.5 9.7 L 0.5 16.6 Z" fill="#ffffff" stroke="#000000" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" pointer-events="all">
                    </path>
                    </g>`;
        return svg;
    }
}

export class Register extends NodeObject{
    renderNode(): string {
        let svg = `<g width="46" height="46" transform="translate(${this.x}, ${this.y}) scale(${this.size})">`;
        if(this.hoveringOver)
            {   svg = svg + `<rect x="2.8" y="2.8" width="18.4" height="18.4" fill="none" stroke="#4286f4" stroke-opacity="0.8" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" pointer-events="stroke">
                            </rect>`;
            }
        svg = svg + `<rect x="2.8" y="2.8" width="18.4" height="18.4" fill="#000000" stroke="#000000" pointer-events="all">
                    </rect>
                    <image x="6.25" y="6.25" width="11.5" height="11.5" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyBjbGFzcz0iaWNvbiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNNDczLjEgMzQ3LjZsLTYzLjUgMjUxQzM4MCA3MTcuNCAzNTEgODAzLjMgMzIyLjkgODU2LjRjLTI4LjEgNTMuMS02MS4yIDkyLjQtOTkuMiAxMTguMS0zOCAyNS43LTgxLjMgMzguNS0xMjkuOSAzOC41LTMxIDAtNTMuOC02LTY4LjItMTcuOUMxMS4yIDk4My4yIDQgOTY5LjMgNCA5NTMuNmMwLTE0LjkgNi0yNy42IDE3LjktMzguNSAxMS45LTEwLjggMjcuOC0xNi4yIDQ3LjYtMTYuMiAxNi4yIDAgMjguNiA0LjEgMzcuMSAxMi41IDguNiA4LjMgMTIuOCAxOC44IDEyLjggMzEuNCAwIDExLjctMi43IDIwLjQtOC4xIDI2LTUuNCA1LjYtOC4xIDkuMy04LjEgMTEuMWwyLjcgMy40YzIuMyAxLjggNSAyLjggOC4yIDIuOCAxMC44IDAgMjAtMy40IDI3LjYtMTAuMSAxOC45LTE3LjEgMzMuMS0zNy44IDQyLjUtNjIuMSA2LjctMTYuNiAxOS4zLTYwLjUgMzcuOC0xMzEuNmwxMTAuNy00MzQuNWgtNzUuNmwxOC4yLTYzLjVjMjcgMC41IDQ2LjctMi45IDU5LTEwLjEgMTIuNC03LjIgMjUuMy0yMy40IDM4LjktNDguNkM0MTMuMiAxNTEuOCA0NTUuMyA5OSA0OTkuNCA2N2M0NC4xLTMyIDkzLjQtNDggMTQ3LjgtNDggMzQuNyAwIDU5LjggNi43IDc1LjYgMjAuMyAxNS44IDEzLjUgMjMuNiAzMSAyMy42IDUyLjYgMCAxOC40LTUuMiAzMy4yLTE1LjUgNDQuMi0xMC40IDExLjEtMjMuNCAxNi41LTM5LjIgMTYuNS0xNC40IDAtMjYuMy00LjUtMzUuOC0xMy41LTkuNC05LTE0LjItMTkuOC0xNC4yLTMyLjQgMC05IDMuMS0xOC41IDkuMS0yOC43IDYtMTAuMSA5LjEtMTcgOS4xLTIwLjYgMC00LTEuMy03LjMtNC05LjgtMi43LTIuNS02LjMtMy43LTEwLjgtMy43LTIxLjYgMC00My43IDEzLjEtNjYuMSAzOS4yLTM2LjkgNDIuNy02Ni42IDEwOS44LTg5LjEgMjAxLjFoNzlMNTUwIDM0Ny44aC03Ni45di0wLjJ6TTU5NC45IDM4MC4zbDE1OC0yN2MyOC41IDQ1IDQ4LjggOTQuNSA2MC44IDE0OC41IDI5LjctNDMuOSA1MS45LTc0LjYgNjYuOS05Mi4zIDIwLjMtMjMuMyAzNy0zOC40IDUwLTQ1LjYgMTMuMS03LjEgMjctMTAuNyA0MS42LTEwLjcgMTYuOSAwIDI5LjcgNC41IDM4LjUgMTMuNXMxMy4yIDIxLjIgMTMuMiAzNi42YzAgMTQuNi00LjQgMjYuNS0xMy4yIDM1LjctOC44IDkuMi0yMCAxMy44LTMzLjUgMTMuOC05LjcgMC0yMC44LTEuOC0zMy4yLTUuNC0xMi40LTMuNi0yMS01LjQtMjUuOS01LjQtMTIuOCAwLTI0LjkgNC41LTM2LjYgMTMuNS0xNS43IDEyLjctMzUgMzkuMi01Ny45IDc5LjMgMjUuOSA5MC44IDQ2LjUgMTQ2IDYxLjggMTY1LjggOSAxMS42IDE4LjEgMTcuNCAyNy42IDE3LjQgNy45IDAgMTQuNi0xLjggMjAuMy01LjYgOC42LTYuMyAyMi4xLTIyLjMgNDAuNS00Ny44bDE2LjMgOS42Yy0yNi42IDQzLjEtNTIuNyA3My4zLTc4LjEgOTAuNS0xOS4xIDEzLjktMzguMSAyMC44LTU2LjggMjAuOC0xOS41IDAtMzUuNi00LjMtNDguNC0xMy0xMi44LTguNi0yNC4xLTIyLjctMzQtNDIuMi0xMC0xOS41LTIxLjgtNTAuOC0zNS43LTkzLjktMzUuMiA0NS02Mi45IDc3LjktODIuOSA5OC43LTIwIDIwLjgtMzYuNyAzNC40LTUwIDQwLjgtMTMuMyA2LjQtMjcuNSA5LjYtNDIuNCA5LjYtMTUuNyAwLTI4LjItNC41LTM3LjQtMTMuOC05LjItOS4yLTEzLjgtMjAuOC0xMy44LTM1LjEgMC0xNS40IDUtMjguMSAxNC45LTM4LjIgMTAtMTAuMSAyMi42LTE1LjIgMzcuOS0xNS4yIDguMyAwIDE3LjQgMi41IDI3LjYgNy4zIDE1LjQgNy41IDI2LjMgMTEuMiAzMi42IDExLjIgOSAwIDE2LjktMS44IDIzLjYtNS42IDktNC41IDIwLjQtMTQuMiAzNC4zLTI5LjMgOC42LTkuMyAyNC4yLTI5LjQgNDYuNy02MC4xLTI4LjktMTA3LjItNTEuNC0xNzEuNS02Ny41LTE5Mi45LTEwLjUtMTMuNS0yMy42LTIwLjMtMzkuNC0yMC4zLTcuOSAwLTE3LjkgMS4zLTI5LjggMy45bDMuNC0xNy4xeiIgLz48L3N2Zz4=" preserveAspectRatio="none" style="pointer-events:none">
                    </image>
                    <rect visibility="hidden" pointer-events="fill" x="6.25" y="6.25" width="11.5" height="11.5">
                    </rect>
                    </g>`;
        return svg;
    }
}

export class StateNode extends NodeObject{
    renderNode(): string {
        return `<g width="40" height="40" transform="translate(${this.x}, ${this.y})" >
        <circle cx="10" cy="10" r="${this.size}" stroke="white" stroke-width="2" fill="transparent" />
        <circle cx="0" cy="20" r="3" stroke="${this.color}" stroke-width="2" fill="transparent" />
        <line x1="2" y1="18" x2="6" y2="14" stroke="${this.color}" stroke-width="2"/>
        <line x1="8" y1="12" x2="12" y2="8" stroke="${this.color}" stroke-width="2"/>
        <line x1="14" y1="6.5" x2="18" y2="2" stroke="${this.color}" stroke-width="2"/>
        <line x1="12" y1="2" x2="18" y2="2" stroke="${this.color}" stroke-width="2"/>
        <line x1="18" y1="8" x2="18" y2="2" stroke="${this.color}" stroke-width="2"/>
        <circle cx="20" cy="0" r="3" stroke="${this.color}" stroke-width="2" fill="transparent" />
        </g>`;
    }
}

export class ResourceNode extends NodeObject{
    renderNode(): string {
        return `<g width="40" height="40" transform="translate(${this.x}, ${this.y})" >
        <circle cx="10" cy="10" r="${this.size}" stroke="white" stroke-width="2" fill="transparent" />
        <circle cx="0" cy="20" r="3" stroke="${this.color}" stroke-width="2" fill="transparent" />
        <line x1="2" y1="18" x2="18" y2="2" stroke="${this.color}" stroke-width="2"/>
        <line x1="12" y1="2" x2="18" y2="2" stroke="${this.color}" stroke-width="2"/>
        <line x1="18" y1="8" x2="18" y2="2" stroke="${this.color}" stroke-width="2"/>
        <circle cx="20" cy="0" r="3" stroke="${this.color}" stroke-width="2" fill="transparent" />
        </g>`;
    }
}

export class ResourceConnection extends ConnectionObject{
    renderNode(): string {
        if (this.hoveringOver)
            {
                return `<g>
                <line x1="${this.startX}" y1="${this.startY}" x2="${this.endX}" y2="${this.endY}" stroke="#00b36b" stroke-width="5" stroke-linecap="round"/>
                <line x1="${this.startX}" y1="${this.startY}" x2="${this.endX}" y2="${this.endY}" stroke="${this.color}" stroke-width="2" />
                </g>`;
            }
        return `<g>
        <line x1="${this.startX}" y1="${this.startY}" x2="${this.endX}" y2="${this.endY}" stroke="${this.color}" stroke-width="2" />
        </g>`;
    }
}

export class StateConnection extends ConnectionObject{
    renderNode(): string {
        if (this.hoveringOver)
            {
                return `<g>
                <line x1="${this.startX}" y1="${this.startY}" x2="${this.endX}" y2="${this.endY}" stroke="#00b36b" stroke-width="5" stroke-dasharray="10, 4" stroke-linecap="round" />
                <line x1="${this.startX}" y1="${this.startY}" x2="${this.endX}" y2="${this.endY}" stroke="${this.color}" stroke-width="2" stroke-dasharray="10, 4" />
                </g>`;
            }
        return `<g>
        <line x1="${this.startX}" y1="${this.startY}" x2="${this.endX}" y2="${this.endY}" stroke="${this.color}" stroke-width="2" stroke-dasharray="10, 4"  />
        </g>`;
    }
}

export function getNodeFromName(name: string, x: number, y: number){
    switch (name){
        case "Source" : return new Source(x, y, name, "black", 2, 1);
        case "Drain" : return new Drain(x, y, name, "black", 2, 1);
        case "Pool" : return new Pool(x, y, name, "black", 2, 1);
        case "Gate" : return new Gate(x, y, name, "black", 2, 1);
        case "Trader" : return new Trader(x, y, name, "black", 2, 1);
        case "Converter" : return new Converter(x, y, name, "black", 2, 1);
        case "End Condition" : return new EndCondition(x, y, name, "black", 2, 1);
        case "Text" : return new TextComponent(x, y, name, "black", 2, 1);
        case "Register" : return new Register(x, y, name, "black", 2, 1);
        default: throw new Error("No selection");
    }
}

export function getConnectionFromName(name: string, startX: number, startY: number, endX: number, endY: number) {
    switch (name) {
        case "ResourceNode" : return new  ResourceConnection(startX,startY,endX,endY,"black");
        case "StateNode" : return new  StateConnection(startX,startY,endX,endY,"black");
        default: throw new Error("No selection");
    }
}