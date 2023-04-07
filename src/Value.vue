<template>
    <div class="card">
        <div class="card-body d-flex flex-column flex-fill">
            <h5 class="card-title">value</h5>
            <CE class="card-text flex-fill" :languages="[['json', 'JSON']]" width="100%" v-model="store.value">
            </CE>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import store from './store';
import CE from 'simple-code-editor';

export default defineComponent({
    data() {
        return {
            store
        }
    },
    components: {
        CE
    }
});
</script>
  
<style></style>
  