import Vue from 'vue'
import Vuex from 'vuex'
import LocalStorage from '../modutes/LocalStorage'

Vue.use(Vuex)

const STORE = new LocalStorage('todo-vue')
export default new Vuex.Store({
	state: {
		todos: []
	},
	getters: {

	},
	mutations: {
		SET_TODOS(state, todos) {
			state.todos = todos
		}
	},
	actions: {
		CREATE_TODO({ commit }, { todo }) {
			// 1.POST //axios.post() 
			const todos = STORE.load()
			todos.push(todo)
			STORE.save(todos)
			// 2.commit mutation  寫入 state
			commit('SET_TODOS', todos)
			// 3. return
			return {
				tID: todos.length - 1,
				todos
			}
		},
		READ_TODOS({ commit }) {
			// 1.load 讀取 
			const todos = STORE.load()
			// 2.commit mutation  寫入 state
			commit('SET_TODOS', todos)
			// 3. return
			return {
				todos
			}
		},
		UPDATE_TODO({ commit }, { tId, todo }) {
			// UPDATE_TODO 整個更新
			// 1.PATCH //axios.patch() 
			const todos = STORE.load()
			todos.splice(tId, 1, todo)
			STORE.save(todos)
			// 2.commit mutation  寫入 state
			commit('SET_TODOS', todos)
			// 3. return
			return {
				tId,
				todo
			}
		},
		// UPDATE_TODO1({ commit }, { tId, content }) {
		// 只更新內容
		// 	// 1.PATCH //axios.patch() 
		// 	const todos = STORE.load()
		// 	todos[tId].content = content
		// 	STORE.save(todos)
		// 	// 2.commit mutation  寫入 state
		// 	commit('SET_TODOS', todos)
		// 	// 3. return
		// 	return {
		// 		tId,
		// 		todo: todos[tId]
		// 	}
		// },
		DELETE_TODO({ commit }, { tId }) {
			// 1.DELETE //axios.delete() 
			const todos = STORE.load()
			const todo = todos.splice(tId, 1)
			STORE.save(todos)
			// 2.commit mutation  寫入 state
			commit('SET_TODOS', todos)
			// 3. return
			return {
				tId: null,
				todo
			}
		},
		CLEAR_TODOS({commit}){
			const todos = []
			STORE.save(todos)
			commit('SET_TODOS' , todos)
			return{
				todos
			}
		}
	}
})
