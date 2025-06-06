import { defineStore } from "pinia";

export const useFormStore = defineStore("form", {
	state: () => ({
		searchForm: {} as Record<string, any>,
	}),
	actions: {
		updateSearchForm(formData: Record<string, any>) {
			this.searchForm = formData;
		},
		resetSearchForm() {
			this.searchForm = {};
		},
	},
});
