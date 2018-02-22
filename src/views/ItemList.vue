<template>
    <div class="news-view">
        <transition :name="transition">
            <div class="news-list" :key="displayedPage" v-if="displayedPage > 0">
                <transition-group tag="ul" name="item">
                    <item v-for="item in displayedItems" :key="item.objectId" :item="item">
                    </item>
                </transition-group>
            </div>
        </transition>
        <div class="news-list-nav">
            <a @click="prev" :class="{'disabled': prevDisabled}">&lt; prev</a>
            <a @click="next">next &gt;</a>
        </div>
    </div>
</template>

<script>
    import Item from '../components/Item.vue'

    export default {
        name: 'item-list',

        components: {
            Item
        },

        props: {
            type: String
        },

        data() {
            const currentTypeItems = this.$store.state.lists[this.type];
            return {
                transition: 'slide-right',
                displayedPage: Number(this.$route.params.page) || 1,
                displayedItems: currentTypeItems.entrylist
            }
        },
        computed: {
            prevDisabled() {
                return this.rankIndex.length <= 1;
            },
            rankIndex() {
                return this.$store.state.rankIndex[this.type];
            }
        },

        methods: {
            next(){
                this.$bar.start();
                const displayedItemsLength = this.displayedItems.length;
                const lastDisplayItem = this.displayedItems[displayedItemsLength - 1];
                const before = lastDisplayItem && lastDisplayItem.rankIndex || undefined;
                console.log('before...', before);
                this.$store.dispatch('FETCH_LIST_DATA', {
                    type: this.type,
                    index: before,
                    action: 'next'
                }).then(() => {
                    const currentTypeItems = this.$store.state.lists[this.type];
                    this.transition = 'slide-right';
                    this.displayedItems = currentTypeItems.entrylist;
                    this.$bar.finish()
                });
            },
            prev() {
                this.$bar.start();
                const rankIndexList = this.rankIndex;
                const before = rankIndexList[rankIndexList.length - 2] || undefined;
                this.$store.dispatch('FETCH_LIST_DATA', {
                    type: this.type,
                    index: before,
                    action: 'prev'
                }).then(() => {
                    const currentTypeItems = this.$store.state.lists[this.type];
                    this.transition = 'slide-left';
                    this.displayedItems = currentTypeItems.entrylist;
                    this.$bar.finish();
                });
            }
        }
    }
</script>

<style lang="stylus">
    a
        cursor pointer
    .disabled
        pointer-events none
    .news-view
        padding-top 45px

    .news-list-nav, .news-list
        background-color #fff
        border-radius 2px

    .news-list-nav
        padding 15px 30px
        position fixed
        text-align center
        top 55px
        left 0
        right 0
        z-index 998
        box-shadow 0 1px 2px rgba(0, 0, 0, .1)
        a
            margin 0 1em
        .disabled
            color #ccc

    .news-list
        position absolute
        margin 30px 0
        width 100%
        transition all .5s cubic-bezier(.55, 0, .1, 1)
        ul
            list-style-type none
            padding 0
            margin 0

    .slide-left-enter, .slide-right-leave-to
        opacity 0
        transform translate(30px, 0)

    .slide-left-leave-to, .slide-right-enter
        opacity 0
        transform translate(-30px, 0)

    .item-move, .item-enter-active, .item-leave-active
        transition all .5s cubic-bezier(.55, 0, .1, 1)

    .item-enter
        opacity 0
        transform translate(30px, 0)

    .item-leave-active
        position absolute
        opacity 0
        transform translate(30px, 0)

    @media (max-width 600px)
        .news-list
            margin 10px 0
</style>
