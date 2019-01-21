import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
axios.defaults.baseURL = "http://localhost:8090/";

export const store = new Vuex.Store({
  state: {
    filter: "all",
    todos: []
  },
  getters: {
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining !== 0;
    },
    todosFilterd: function(state) {
      if (state.filter === "all") {
        return state.todos;
      } else if (state.filter === "active") {
        return state.todos.filter(todo => !todo.completed);
      } else if (state.filter === "completed") {
        return state.todos.filter(todo => todo.completed);
      }
      return state.todos;
    },
    showClearCompletedButton: function(state) {
      return state.todos.filter(todo => todo.completed).length > 0;
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false
      });
    },
    updateFilter(state, filter) {
      state.filter = filter;
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed);
    },
    checkAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked));
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id);
      state.todos.splice(index, 1);
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id);
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing
      });
    },
    retrieveTodos(state, todos) {
      state.todos = todos;
    }
  },
  actions: {
    retrieveTodos(context) {
      axios
        .get("/todo/all")
        .then(({ data }) => {
          const rsp = data;
          if (rsp.status === 0) {
            context.commit("retrieveTodos", rsp.data);
          } else {
            alert(rsp.data);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    addTodo(context, todo) {
      axios
        .post("/todo/add/" + todo.title)
        .then(res => {
          const rsp = res.data;
          if (rsp.status === 0) {
            context.commit("addTodo", rsp.data);
          } else {
            alert(rsp.data);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    updateFilter(context, filter) {
      context.commit("updateFilter", filter);
    },
    clearCompleted(context) {
      axios
        .post("/todo/deleteCompleted")
        .then(({ data }) => {
          const rsp = data;
          if (rsp.status === 0) {
            context.commit("clearCompleted");
          } else {
            alert(rsp.data);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    checkAll(context, checked) {
      axios
        .post("/todo/checkOrUncheckAll?checked=" + checked)
        .then(({ data }) => {
          const rsp = data;
          if (rsp.status === 0) {
            context.commit("checkAll", checked);
          } else {
            alert(rsp.data);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    deleteTodo(context, id) {
      axios
        .post("/todo/delete/" + id)
        .then(({ data }) => {
          const rsp = data;
          if (rsp.status === 0) {
            context.commit("deleteTodo", id);
          } else {
            alert(rsp.data);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    updateTodo(context, todo) {
      axios
        .post("/todo/update/" + todo.id, {
          completed: todo.completed,
          title: todo.title
        })
        .then(({ data }) => {
          const rsp = data;
          if (rsp.status === 0) {
            context.commit("updateTodo", rsp.data);
          } else {
            alert(rsp.data);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
});
