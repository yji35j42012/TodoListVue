<template>
	<div class="todo">
		<h1>This is an todo page</h1>

		<router-link to="/todo" replace>All</router-link> |
		<router-link to="/todo?filter=active" replace>Active</router-link> |
		<router-link :to="{name:'Todo' , query:{filter:'done'}}" replace>Done</router-link> |

		<!-- <p>show: {{ filter}}</p>
		<div>
			{{list}}
		</div> -->
		<ul>
			<!-- <li v-for="item of list" :key="item.tId+''+item.todo.content" > -->
			<!-- <li v-for="item of list" :key="item.tId">
				<template v-if="edit !== item.tId">
					<input type="checkbox" v-model="item.todo.done" >
					{{item.todo.content}}
				</template>
				<template v-else>
					<input type="text" v-model="item.todo.content">
				</template>				
			</li> -->
			<TodoItem 
				v-for="item of list" 
				:key="item.tId" 
				:todo="item.todo" 
				:edit="item.tId === edit "
				@check=" value => checkHandler(item.tId , value)"
			/>
		</ul>
	</div>
</template>


<script>
import TodoItem from '../components/TodoItem'
export default {
	data() {
		return {
			filter: "all", //all , active, done
			edit:null,
		};
	},
	computed: {
		list() {
			return this.$store.getters.filterList(this.filter);
		},
	},
	watch:{
		// $route: function(route){
		// 	// check query
		// 	this.filter = route.query.filter || 'all'
		// }

		// immediate 網址改變，內容馬上變
		// check qrery => redirect
		$route:{
			immediate:true,
			handler:function(route){
				this.filter = route.query.filter || 'all'
			}
		}
	},
	components:{
		TodoItem
	},
	methods:{
		checkHandler(tId ,value){
			console.log(tId , value);
		}
	}
};
</script>
