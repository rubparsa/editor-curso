import { Component, OnInit, NgModule, NgZone, Renderer2, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AsignaturaService } from '../services/asignatura.service';
import { Asignatura } from '../model/asignatura';
import { CapituloService } from '../services/capitulo.service';
import { Capitulo } from "../model/capitulo";
import { UsuarioService } from '../services/usuario.service';

import { GLOBAL } from '../services/global';
//import { NoopNgZone } from '../../../node_modules/@angular/core/src/zone/ng_zone';

declare function reloadFT(): any;

@Component({
  selector: 'capitulo-add',
  templateUrl: '../view/capitulo-add.html',
  providers: [AsignaturaService, CapituloService, UsuarioService]
})
export class CapituloAddComponent implements OnInit {
  public titulo: string;
  public capitulo: Capitulo;
  public alertMessage;
  public asignatura_id: string;
  public nombreAsignatura: string;
  public tempIdCapitulo: string;
  public identidad;
  public token;
  nodes = [];
  options = {
    allowDrag: true,
    allowDrop: true
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _capituloService: CapituloService,
    private _usuarioService: UsuarioService,
    private _asignaturaService: AsignaturaService,
    //private renderer2: Renderer2,
    //private elementRef: ElementRef,
    private zone: NgZone
  ){
    
    this.capitulo = new Capitulo('','','',[],'','', [], 2);
    this.asignatura_id = this._route.snapshot.paramMap.get('asignatura');
    this.identidad = this._usuarioService.getIdentidad();
    this.token = this._usuarioService.getToken();
    console.log(this.token);
    //this.nombreAsignatura = String(this._asignaturaService.getNombreAsignatura(this.token, this.asignatura_id));
    this.titulo = 'Gestor de contenido';
    //console.log(this._asignaturaService.getNombreAsignatura(this.token, this.asignatura_id));
    //const componente = this;
  }

  ngOnInit(){
     
    $('#tree').fancytree({

      activate: function(event, data){
        this.alertMessage = '';
        this.capitulo = data.node.data;
        this.capitulo.texto = data.node.data.texto;
        this.capitulo.etiquetas = data.node.data.etiquetas;
      },
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
          if  (node.getLevel() > 1 ) {
            // Don't allow dropping *over* a node (would create a child). Just
            // allow changing the order:
            return ["before", "after"];
          }
          // Accept everything:
          return true;
        },
        dragExpand: null,     // Callback(targetNode, data), return false to prevent autoExpand
        dragOver: null,       // Callback(targetNode, data)
        dragDrop: function(node, data) {
          /** This function MUST be defined to enable dropping of items on
           *  the tree.
           */
          data.otherNode.moveTo(node, data.hitMode);
        },
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
      source: {
        url: GLOBAL.url + 'capitulos/' + this.asignatura_id,
        cache: false
      },
      postProcess: function(event, data){
        data.result = convertData(data.response);
      }
    });

    //convertir los datos de la llamada a source a la estructura que espera Fancytree
    function convertData(nodeList) {
    var parent,
      nodeMap = {};

    nodeList = nodeList.capitulos;

    // Pass 1: store all contents in reference map
    $.each(nodeList, function(i, c){
      nodeMap[c._id] = c;
      //console.log(nodeMap[c._id]);
      //console.log("ID: " + nodeMap[c.id]._id + " Key: " + nodeMap[c.id].key + " Padre: " + nodeMap[c.id].padre);
    });
    // Pass 2: adjust fields and fix child structure

    
    nodeList = $.map(nodeList, function(c){
      // Rename 'key' to 'id'
      //c.key = c.id;
      //delete c.id;
      // Set checkbox for completed tasks
      //c.selected = (c.status === "completed");
      // Check if c is a child node

      if(c.parent){
          // add c to `children` array of parent node

          parent = nodeMap[c.parent];
          
          if(nodeMap[c.parent].children) {
            nodeMap[c.parent].children.push(c);
          }
          else {
            nodeMap[c.parent].children = [c];
          }
          return null;  // Remove c from nodeList
      }
      return c;  // Keep top-level nodes
    });
    // Pass 3: sort children by 'position'
    $.each(nodeList, function(i, c){
      if(c.children && c.children.length > 1 ) {
          c.children.sort(function(a, b){
              return ((a.key < b.key) ? -1 : ((a.key > b.key) ? 1 : 0));
          });
      }
    });
    
    return nodeList;
    }

    // Note: Loading and initialization may be asynchronous, so the nodes may not be accessible yet.
    $("#anyadirNodo").click(function () {
      var rootNode = $("#tree").fancytree("getRootNode");
      rootNode.addChildren({
        title: "Nuevo nodo"
      });
      
    }); //end click anyadirNodo

    $("#anyadirHijo").click(function () {
      var node = $("#tree").fancytree("getActiveNode");

      if (node.getLevel() == 1){
        node.addChildren({
          title: "Nuevo hijo"
        });

        node.setExpanded();
      }
      else{
        alert('Sólo se permite un nivel de nodos hijos');
      }
    }); //end click anyadirHijo

    /*
    $("#eliminarNodo").click(function () {
      if (confirm('¿Está seguro de eliminar el nodo seleccionado?')) {
        var node = $("#tree").fancytree("getActiveNode");
        node.remove();
      }
    });
    */
    $("#eliminarHijos").click(function () {
      if (confirm('¿Está seguro de eliminar los hijos del nodo seleccionado?')) {
        var node = $("#tree").fancytree("getActiveNode");
        node.removeChildren();
      }
    });

    $(document).on('click', '#tree', () => {
      this.zone.run(() => {
        let node_prov = $("#tree").fancytree("getActiveNode");
        this.capitulo.texto = node_prov.data.texto;
        this.capitulo.etiquetas = node_prov.data.etiquetas;
      });
    });

  } //fin onInit

  public onSubmit(etiqueta){
    
    this._route.params.forEach((params: Params) => {


      let node_prov = $("#tree").fancytree("getActiveNode");
      let nombre_prov = node_prov.title;
      this.capitulo.title = nombre_prov;
      this.capitulo.asignatura = this.asignatura_id;
      this.capitulo._id = node_prov.data._id;
      if(this.capitulo.etiquetas){
        this.capitulo.etiquetas.push(etiqueta);
      }
      else{
        this.capitulo.etiquetas = etiqueta;
      }

      if(node_prov.getLevel() == 2){
        this.capitulo.parent = node_prov.getParent().data._id;
      }
      else{
        this.capitulo.parent = '';
      }
      console.log(this.capitulo);
      
      if(this.capitulo._id){

        this._capituloService.updateCapitulo(this.capitulo._id, this.capitulo).subscribe(
          response => {
            if (!response.capitulo) {
              this.alertMessage = 'Error en el servidor';
            }
            else {
              this.alertMessage = 'El capítulo se ha editado correctamente';
              this.capitulo = response.capitulo;
              reloadFT();
              //this._router.navigate(['/editar-album', response.album._id]);
            }
          },
          error => {

          }
        );
      } // end if

      else{
        
        this._capituloService.addCapitulo(this.capitulo).subscribe(
          response => {
            if (!response.capitulo) {
              this.alertMessage = 'Error en el servidor';
            }
            else {
              this.alertMessage = 'El capítulo se ha creado correctamente';
              this.capitulo = response.capitulo;
              reloadFT();
              //this._router.navigate(['/editar-album', response.album._id]);
            }
          },
          error => {

          }
        );
      } //end else
    });
  } // end onSubmit

  public eliminarNodo(){
    let node_prov = $("#tree").fancytree("getActiveNode");

    if(node_prov.data._id){
      this._capituloService.deleteCapitulo(node_prov.data._id).subscribe(
        response => {
          if (!response.capitulo){
            this.alertMessage = 'Error en el servidor';
          }
          else{
            this.alertMessage = 'El nodo se ha eliminado correctamente';
            reloadFT();
          }
        },
        error => {

        }
      );
    } //end if
    else{
      node_prov.remove();
    }
  } // end eliminarNodo()

  public anyadirEtiqueta(etiqueta){
    let node_prov = $("#tree").fancytree("getActiveNode");

    if(node_prov){

      this.capitulo._id = node_prov.data._id;

      this._capituloService.addEtiqueta(this.token, this.capitulo._id, etiqueta).subscribe(
        response => {
          if (!response.capitulo) {
            this.alertMessage = 'Error en el servidor';
          }
          else {
            this.alertMessage = 'La etiqueta se ha asociado al contenido correctamente';
            this.capitulo = response.capitulo;
            //reloadFT();
          }
        },
        error => {

        }
      );
    } // end if
    else{
      this.alertMessage = 'Guarde primero el contenido';
    }
  } // end anyadirEtiqueta

} //end Component