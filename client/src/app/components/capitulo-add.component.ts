import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CapituloService } from '../services/capitulo.service';
import { Capitulo } from '../model/capitulo';

@Component({
  selector: 'capitulo-add',
  templateUrl: '../view/capitulo-add.html',
  providers: [CapituloService]
})
export class CapituloAddComponent implements OnInit {
  public titulo: string;
  public capitulo: Capitulo;
  public alertMessage;
  //@Input() tinymce: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _capituloService: CapituloService
  ){
    this.titulo = 'Gestor de contenido - Añadir nuevo capítulo';
    this.capitulo = new Capitulo('','','','', 1);
  }

  ngOnInit(){
      $('#tree').fancytree({
        extensions: ["dnd", "edit", "themeroller"],
        dnd: {
          // Opciones disponibles con su valor por defecto:
          autoExpandMS: 1000,   // Expand nodes after n milliseconds of hovering
          draggable: null,      // Additional options passed to jQuery UI draggable
          droppable: null,      // Additional options passed to jQuery UI droppable
          dropMarkerOffsetX: -24,  // absolute position offset for .fancytree-drop-marker
                                  // relatively to ..fancytree-title (icon/img near a node accepting drop)
          dropMarkerInsertOffsetX: -16, // additional offset for drop-marker with hitMode = "before"/"after"
          focusOnClick: true,  // Focus, although draggable cancels mousedown event (#270)
          preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
          preventVoidMoves: true,      // Prevent dropping nodes 'before self', etc.
          smartRevert: true,    // set draggable.revert = true if drop was rejected

          // Events that make tree nodes draggable
          dragStart: function(node, data) {
            return true;      // Callback(sourceNode, data), return true to enable dnd
          },  
          dragStop: null,       // Callback(sourceNode, data)
          initHelper: null,     // Callback(sourceNode, data)
          updateHelper: null,   // Callback(sourceNode, data)

          // Events that make tree nodes accept draggables
          dragEnter: function(node, data) {
            return true;      // Callback(targetNode, data)
          },
          dragExpand: null,     // Callback(targetNode, data), return false to prevent autoExpand
          dragOver: null,       // Callback(targetNode, data)
          dragDrop: null,       // Callback(targetNode, data)
          dragLeave: null       // Callback(targetNode, data)
        },
        edit: {
          // Opciones disponibles con su valor por defecto:
          adjustWidthOfs: 4,   // null: don't adjust input size to content
          inputCss: { minWidth: "3em" },
          triggerStart: ["clickActive", "f2", "dblclick", "shift+click", "mac+enter"],
          beforeEdit: $.noop,   // Return false to prevent edit mode
          edit: $.noop,         // Editor was opened (available as data.input)
          beforeClose: $.noop,  // Return false to prevent cancel/save (data.input is available)
          save: $.noop,         // Save data.input.val() or return false to keep editor open
          close: $.noop,        // Editor was removed
        },
        themeroller: {
          activeClass: "ui-state-active",      // Class added to active node
          addClass: "ui-corner-all",           // Class added to all nodes
          focusClass: "ui-state-focus",        // Class added to focused node
          hoverClass: "ui-state-hover",        // Class added to hovered node
          selectedClass: "ui-state-highlight"  // Class added to selected nodes
        },
        source: []
      });

      // Note: Loading and initialization may be asynchronous, so the nodes may not be accessible yet.
      
      $("#anyadirNodo").click(function () {
        var rootNode = $("#tree").fancytree("getRootNode");
        rootNode.addChildren({
          title: "Nuevo nodo"
        });
      });

      $("#anyadirHijo").click(function () {
        var node = $("#tree").fancytree("getActiveNode");
        node.addChildren({
          title: "Nuevo hijo"
        });
      });
  }
  public onSubmit(){

    this._route.params.forEach((params: Params) => {

      //let texto_prov = document.getElementById('tinymce').innerHTML;

      //this.capitulo.texto = texto_prov;

      this._capituloService.addCapitulo(this.capitulo).subscribe(
        response => {
          if(!response.album){
            this.alertMessage = 'Error en el servidor';
          }
          else{
            this.alertMessage = 'El capítulo se ha creado correctamente';
            this.capitulo = response.capitulo;
            //this._router.navigate(['/editar-album', response.album._id]);
          }
        },
        error => {

        }
      );
    });
  }
}