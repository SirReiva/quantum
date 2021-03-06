import { qPage, qStack } from '../quantum/components';
import { h } from '../quantum/core/h';

export default class Page2 extends qPage {
    public static tagName = 'q-page2';
    template() {
        return  <q-scafold>
                    <q-searchbar over>
                        <q-toolbarbutton onClick={() => this.navigate()} slot="start"><q-icon icon="arrow-left"></q-icon></q-toolbarbutton>
                        <span>Detail</span>
                    </q-searchbar>
                    <q-content>
                        <q-image srcimg='https://picsum.photos/2000/2000?random'>
                            <q-icon style="color: rgb(var(--q-material-primary-rgb));" icon="spinner" spin></q-icon>
                        </q-image>
                        <p style="text-align: justify; padding: 20px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi placerat tempus porta. Mauris faucibus, ipsum vel venenatis mattis, velit mauris placerat nisi, quis varius massa nisi et velit. Sed nec nulla vestibulum, pretium magna eu, tincidunt
                            velit. Vivamus tincidunt nec lectus maximus dictum. Morbi nec ultrices urna, nec feugiat eros. Nunc laoreet tincidunt neque, non rutrum lectus placerat id. Quisque vel lacus quis lacus facilisis maximus a sed dui. Nullam sed sapien a nulla
                            dictum porttitor. Sed non neque nulla. Sed tincidunt, augue ut ultrices finibus, orci mi maximus justo, eu facilisis felis eros in arcu. Vestibulum ac nisi odio. Nam eget nulla tellus. Nunc efficitur vitae purus sit amet gravida. Quisque
                            vel lorem a tellus rhoncus efficitur quis at orci. Quisque et libero vitae turpis pellentesque posuere. Sed ultrices id mi in dapibus. Quisque semper nulla nisi, vel commodo magna ultrices maximus. Sed a quam ut nisi bibendum molestie
                            in bibendum ligula. Mauris dui odio, ornare vel lobortis vel, feugiat ut orci. Cras lacinia sagittis iaculis.</p>
                        <q-image srcimg='https://picsum.photos/1000/1000?random'>
                            <q-icon style="color: rgb(var(--q-material-primary-rgb));" icon="spinner" spin></q-icon>
                        </q-image>
                        <p style="text-align: justify; padding: 20px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi placerat tempus porta. Mauris faucibus, ipsum vel venenatis mattis, velit mauris placerat nisi, quis varius massa nisi et velit. Sed nec nulla vestibulum, pretium magna eu, tincidunt
                            velit. Vivamus tincidunt nec lectus maximus dictum. Morbi nec ultrices urna, nec feugiat eros. Nunc laoreet tincidunt neque, non rutrum lectus placerat id. Quisque vel lacus quis lacus facilisis maximus a sed dui. Nullam sed sapien a nulla
                            dictum porttitor. Sed non neque nulla. Sed tincidunt, augue ut ultrices finibus, orci mi maximus justo, eu facilisis felis eros in arcu. Vestibulum ac nisi odio. Nam eget nulla tellus. Nunc efficitur vitae purus sit amet gravida. Quisque
                            vel lorem a tellus rhoncus efficitur quis at orci. Quisque et libero vitae turpis pellentesque posuere. Sed ultrices id mi in dapibus. Quisque semper nulla nisi, vel commodo magna ultrices maximus. Sed a quam ut nisi bibendum molestie
                            in bibendum ligula. Mauris dui odio, ornare vel lobortis vel, feugiat ut orci. Cras lacinia sagittis iaculis.</p>
                    </q-content>
                </q-scafold>;
    }

    styles() { return super.styles() + ``; 
    }


    navigate() {
        qStack.instances["main"].pop();
    }

    constructor() {
        super({});
    }
}

