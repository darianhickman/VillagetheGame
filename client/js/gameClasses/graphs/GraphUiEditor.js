var GraphUiEditor = IgeSceneGraph.extend({
	classId: 'GraphUiEditor',

	/**
	 * Called when loading the graph data via ige.addGraph().
	 * @param options
	 */
	addGraph: function (options) {
		var self = this,
			uiScene = ige.$('uiSceneEditor');

        var editorMarketDialog = new EditorMarketDialog()
            .id('editorMarketDialog')
            .layer(1)
            .hide()
            .mount(uiScene);

        if(!EditorMarketDialog.prototype.isMarketSet) {
            EditorMarketDialog.prototype.isMarketSet = true;
            GameObjects.setupEditorMarket(editorMarketDialog)
        }

        $('#editorTopNavBar').css('display','')

        if($('#editorTopNavList').is(':empty')){
            $('#editorTopNavList').append($('<li id="quitButtonEditor"/>').text('Quit'),
                $('<li id="saveButtonEditor"/>').text('Save'),
                $('<li id="selectButtonEditor"/>').text('Select'),
                $('<li id="deleteButtonEditor"/>').text('Delete'),
                $('<li id="marketButtonEditor"/>').text('Build')
            )

            self.addActions();
        }
	},

	addActions: function () {
        var self = this;

        $('#quitButtonEditor')
            .click(function(){
                ige.client.editorManager.gotoStep("closeEditor");
            })

        $('#saveButtonEditor')
            .click(function(){
                ige.client.editorManager.saveVillageData();
            })

        $('#selectButtonEditor')
            .click(function(){
                ige.client.fsm.enterState('editor');
            })

        $('#deleteButtonEditor')
            .click(function(){
                ige.client.fsm.enterState('editorDelete');
            })

        $('#marketButtonEditor')
			.click(function () {
                ga("send",  "Open editor dialog");
                ige.$('editorMarketDialog').show();
			});

	},

	/**
	 * The method called when the graph items are to be removed from the
	 * active graph.
	 */
	removeGraph: function () {
		// Since all our objects in addGraph() were mounted to the
		// 'scene1' entity, destroying it will remove everything we
		// added to it.
		ige.$('scene1').destroy();
	}
});
