<template>
    <div class="card">
        <div class="card-body d-flex flex-column flex-fill">
            <h5 class="card-title">errors</h5>

            <ul class="list-group list-group-flush card-text flex-fill">
                <li v-for="e in errors" class="list-group-item">{{ e }}</li>
            </ul>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import store from './store';
import { validate } from 'jsonschema';

export default defineComponent({
    computed: {
        errors() {
            const errors: string[] = [];
            let value: object = {}, schema: object = {};
            try {
                value = JSON.parse(store.value);
            } catch (e) {
                errors.push(`json value parse error: ${e}`);
            }
            try {
                schema = JSON.parse(store.schema);
            } catch (e) {
                errors.push(`json schema parse error: ${e}`);
            }
            if (errors.length) {
                return errors;
            }

            const v = validate(value, schema);
            if (v.errors.length) {
                return v.errors.map(({ message, path, name }) => `json value mismatches schema: ${message} @ ${path} ${name}`);
            }

            return ['ok'];
        }
    }
});
</script>
  
<style></style>
  