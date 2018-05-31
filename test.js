var info = '郵便番号を入力してください';
var watchtest = new Vue({
    el: '#watchtest',
    data: {
        question: '',
        answer: info
    },
    watch: {
        //watch:入力を検知
        question: function (newQuestion, oldQuestion) {
            this.answer = '入力待ち...';
            this.getAnswer();
            if(newQuestion === ""){
                info = '郵便番号を入力してください';
            }
            var addressurl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + newQuestion;
            $.ajax(addressurl)
                .done(function(data) {
                        info = "該当なし";
                        var result = data.results[0].address_components;
                        info = result[3]['long_name'] + ' ' + result[2]['long_name'] + ' ' + result[1]['long_name']+ ' ';
                    }
                );
        }
    },
    methods: {
        getAnswer: _.debounce(
            function () {
                this.answer = info
            },
            600
        )
    }
})
Vue.component('todo-item', {
    props: {
        todo: {
            type: Object,
            required: true
        }
    },
    template: '<div>' +
    '<span>{{ todo.text }}</span>' +
    '<button type="button" v-on:click="onClickRemove">削除</button>' +
    '</div>',
    methods: {
        onClickRemove: function () {
            this.$emit('remove')
        }
    }
});
var vm = new Vue({
    el: '#app',
    data: {
        todos: [
        ]
    },
    methods: {
        addTodo: function () {//addTodo:保存ボタン
            if(info === '該当なし' || info === '郵便番号を入力してください'){
                alert("有効な番号を入力してください");
            }else {
            this.todos.push({
                completed: false,
                text: info
            })}
        }
    }
});