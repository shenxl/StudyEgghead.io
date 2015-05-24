module.exports = function (grunt) {

    //// 从config.json文件中读取属性
    //grunt.initConfig(grunt.file.readJSON("config.json"));

    //// 直接赋值对象
    //grunt.initConfig({
    //    person:{
    //        name : "shen xiaolei"
    //    }
    //})

    //grunt.registerTask("default",function(){
    //    grunt.log.writeln("Hello," + grunt.config.get("person").name);
    //})

    //// Watch Sample
    //grunt.loadNpmTasks("grunt-contrib-watch");
    //grunt.initConfig({
    //    watch:{
    //        files:["watch.txt"],
    //        tasks:["pat"]
    //    }
    //})
    //grunt.registerTask("pat",function(){
    //    grunt.log.writeln("Keep going , you are greet!");
    //})

    // // Template Sample
    //grunt.initConfig({
    //     files : [".js",".html"],
    //     compile : "<%= files %>"
    // })
    //
    //grunt.registerTask("default",function(){
    //    //grunt.log.writeln(grunt.config.get("compile"))
    //     grunt.log.writeln(grunt.template.process("<%= files %>"));
    //    grunt.log.writeln(grunt.template.today());
    //})

    //// Uglify Sample & Watch & Template
    //grunt.loadNpmTasks("grunt-contrib-uglify");
    //grunt.loadNpmTasks("grunt-contrib-watch");
    //grunt.initConfig({
    //    config: grunt.file.readJSON("config.json"),
    //    uglify:{
    //        dist:{
    //            files:{
    //                "dist/app.min.js" : "<%= config.input %>"
    //            }
    //        }
    //    },
    //    watch:{
    //        files:"<%= config.input %>",
    //        tasks:["uglify"]
    //    }
    //})

    // Multitask
    grunt.initConfig({
        tasks:{
            one:"first",
            two:"second"
        }
    });

    grunt.registerMultiTask("tasks",function(){
        grunt.log.writeln(this.target + " " +  this.data);
    })


}