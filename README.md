# Quantum

![](https://github.com/SirReiva/quantum/blob/master/logobig.png?raw=true)

VirtualDom with webcomponents.

## Installation

NPM

```bash
npm install
```
```bash
npm start
```
```bash
npm run build
```

## Demo

[Here](https://sirreiva.github.io/quantumtest/)

## Documentation

### Example
```tsx

class MyComponent extends QuantumElement {

    componentBeforeLoaded?() { }

    componentMounted?() { }

    componentLoaded?() { }

    componentBeforeUpdate?() { }

    componentAfterUpdate?() { }

    componentUnmounted?() { }

    componentAttributeChange?(name: string, oldVal: any, newVal: any) { }

    componentPropChange?(name: string, oldVal: any, newVal: any) {}

    template(): any { return `
        :host {
            display: block;
        }
        div {
            color: #111;
        }
    `; }
    styles(): string {
        return <div>{this.props.count}</div>
    }

    constructor() {
        super({ count: 0});
    }
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)