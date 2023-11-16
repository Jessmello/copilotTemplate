function skillsMember() {
    var member = {
        name: 'John Doe',
        age: 30,
        skills: ['js', 'html', 'css'],
        showSkills: function() {
            this.skills.forEach(function(skill) {
                console.log(this.name + ' knows ' + skill);
            }.bind(this));
        }
    };

    member.showSkills();
}
