( function( blocks, element, components) {

  var el = element.createElement,
  registerBlockType = blocks.registerBlockType,
  InspectorControls = wp.blockEditor.InspectorControls,
  InspectorAdvancedControls = wp.blockEditor.InspectorAdvancedControls,
  Fragment = element.Fragment,
  useBlockProps = wp.blockEditor.useBlockProps,
  AlignmentMatrixControl = components.__experimentalAlignmentMatrixControl,
  FocalPointPicker = components.FocalPointPicker,
  FontSizePicker = components.FontSizePicker,
  MediaUpload =  wp.blockEditor.MediaUpload,
  MediaUploadCheck =  wp.blockEditor.MediaUploadCheck,
  ColorPalette = components.ColorPalette,
  ColorPicker = components.ColorPicker,
  Modal = components.Modal,
  useState = element.useState,
  useEffect = element.useEffect,
  useRef = element.useRef,
  BlockControls = wp.blockEditor.BlockControls,
  TabPanel = components.TabPanel,
  ToolbarGroup  = components.ToolbarGroup,
  ToolbarDropdownMenu = components.ToolbarDropdownMenu,
  TextControl  = components.TextControl,
  TextareaControl = components.TextareaControl,
  PanelBody = components.PanelBody,
  SelectControl = components.SelectControl,
  CheckboxControl = components.CheckboxControl,
  Button = components.Button,
  UnitControl = components.__experimentalUnitControl,
  RadioControl = components.RadioControl,
  InnerBlocks = wp.blockEditor.InnerBlocks
  RichText = wp.blockEditor.RichText;

  

  function MyMediaUploader({ mediaIDs, onSelect, toolbar = false }) {
    return el(MediaUploadCheck, null, el(MediaUpload, {
      onSelect: onSelect,
      allowedTypes: [ 'image' ],
      value: mediaIDs,
      render: ({
        open
      }) => el(Button, {
        icon: 'insert',
        variant: "secondary",
        onClick: open,
        className: toolbar ? '' : "button button-large",
      }, 'Aggiungi/Modifica'),
      gallery: true,
      multiple: true
    }));
  }


  function animation(mode){
    var effect = mode;
    var creativeEffect = {};
    var directionvertical = true;

    switch(mode) {
      case 'fade':
        directionvertical = false;
        break;
      case 'creative1':
        effect = 'creative';
        creativeEffect = {
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          }
        };
        directionvertical = false;
        break;
      case 'creative2':
        effect = 'creative';
        creativeEffect = {
          prev: {
            opacity: 0,
            translate: [0, 0, -100],
          },
          next: {
            opacity: 0,
          }
        };
        directionvertical = false;
        break;
      case 'creative3':
        effect = 'creative';
        creativeEffect = {
          prev: {
            opacity: 0,
            translate: [0, 0, 100],
          },
          next: {
            opacity: 0,
          }
        };
        directionvertical = false;
        break;
      case 'creative4':
        effect = 'creative';
        creativeEffect = {
          prev: {
            shadow: true,
            translate: ["-20%", 0, -1],
          },
          next: {
            translate: ["100%", 0, 0],
          }
        };
        directionvertical = false;
        break;
      case 'creative5':
        effect = 'creative';
        creativeEffect = {
          prev: {
            translate: ["-50%", 0, 0],
            rotate: [0, 180, 0],
            scale: 0.5
          },
          next: {
            translate: ["-50%", 0, 0],
            rotate: [0, -180, 0],
            scale: 0.5
          }
        };
        directionvertical = false;
        break;
    }
    return{
      effect : effect,
      creativeEffect: creativeEffect,
      directionvertical: directionvertical
    }
  }
  
  function alignText(v){
    var alignText = {}; 
    switch(v) {
      case 'top left':
        alignText = {
          position: 'absolute',
          'z-index': '2',
          color: 'white',
          top: '20px',
          left: '50px',
          transform:'translate(0,0)',
          'text-align': 'left'
        };
        break;
      case 'top center':
        alignText = {
          position: 'absolute',
          'z-index': '2',
          color: 'white',
          top: '20px',
          left: '50%',
          transform:'translateX(-50%)',
          'text-align': 'center'
        };
        break;
      case 'top right':
        alignText = {
          position: 'absolute',
          'z-index': '2',
          color: 'white',
          top: '20px',
          right: '50px',
          transform:'translate(0,0)',
          'text-align': 'right'
        };
        break;
      case 'center left':
        alignText = {
          position: 'absolute',
          'z-index': '2',
          color: 'white',
          top: '50%',
          left: '50px',
          transform:'translateY(-50%)',
          'text-align': 'left'
        };
        break;
      case 'center center':
        alignText = {
          position: 'absolute',
          'z-index': '2',
          color: 'white',
          top: '50%',
          left: '50%',
          transform:'translate(-50%,-50%)',
          'text-align': 'center'
        };
        break;
      case 'center right':
        alignText = {
          position: 'absolute',
          'z-index': '2',
          color: 'white',
          top: '50%',
          right: '50px',
          transform:'translateY(-50%)',
          'text-align': 'right'
        };
      break;
      case 'bottom left':
        alignText = {
          position: 'absolute',
          'z-index': '2',
          color: 'white',
          bottom: '20px',
          left: '50px',
          transform:'translate(0,0)',
          'text-align': 'left'
        };
        break;
      case 'bottom center':
        alignText = {
          position: 'absolute',
          'z-index': '2',
          color: 'white',
          bottom: '20px',
          left: '50%',
          transform:'translateX(-50%)',
          'text-align': 'center'
        };
        break;
      case 'bottom right':
        alignText = {
          position: 'absolute',
          'z-index': '2',
          color: 'white',
          bottom: '20px',
          right: '50px',
          transform:'translate(0,0)',
          'text-align': 'right'
        };
        break;
    }
    return alignText;
  }

  
	registerBlockType( 'bc/slide', {
    apiVersion: 2,
    title: 'BC Slide',
    icon: 'slides',
    category: 'bweb-component',
    
    "supports": {
      
      "align": [ 'wide', 'full' ]
    },
    attributes: {
      'regeventDOM': {
				type: 'boolean',
        default: 0
			},
      'blockID': {
				type: 'string',
        default: '0'
			},
			'mode': {
				type: 'string',
        default: 'slide'
			},
      'loop': {
        type: 'boolean',
        default: 0
      },
      'speed': {
        type: 'string',
        default: '600'
      },
      'autoplay': {
        type: 'boolean',
        default: 0
      },
      'delay': {
        type: 'string',
        default: 3000
      },
      'direction': {
        type: 'string',
        default: 'horizontal'
      },
      'slidesPerView': {
        type: 'string',
        default: '1'
      },
      'valueH': {
        type: 'string',
        default: '500px'
      },
      'Overlaycolor': {
        type: 'string',
        default: 'rgba(0, 0, 0, 0.47)'
      },
      'isTextShow': {
        type: 'string',
        default: 'single'
      },
      'Textalignment': {
        type: 'string',
        default: 'center center'
      },
      'arrowShow':{
        type: 'boolean',
        default: 1
      },
      'pointerShow':{
        type: 'boolean',
        default: 0
      },
      'pointerType':{
        type: 'string',
        default: 'square'
      },
      'dynamicBullets':{
        type: 'boolean',
        default: 0
      },
      'navpointcolor': {
        type: 'string',
        default: '#007aff'
      },
      'option': {
        type: 'string',
        default: ''
      },
      
      'images': {
        type: 'array',
        source: 'query',
        selector: '.swiper-slide',
        default: [],
  
        query: {
          focalPointX:{
            type: 'string',
            source: 'attribute',
            attribute: 'data-focalpointx',
            selector: 'img',
          },
          focalPointY:{
            type: 'string',
            source: 'attribute',
            attribute: 'data-focalpointy',
            selector: 'img',
          },
          countI: {
            type: 'number',
            source: 'attribute',
            attribute: 'data-count',
            selector: 'img',
          },
          mediaID: {
            type: 'number',
            source: 'attribute',
            attribute: 'data-id',
            selector: 'img',
          },
          mediaURL: {
            type: 'string',
            source: 'attribute',
            attribute: 'src',
            selector: 'img',
          },
          thumbnail: {
            type: 'string',
            source: 'attribute',
            attribute: 'data-thumb',
            selector: 'img',
          },
          Textalignment: {
            type: 'string',
            source: 'attribute',
            attribute: 'data-textalignment',
            selector: 'img'
          },
          texttitle: {
            type: 'array',
            source: 'html',
            selector: '.caption-title',
          },
          texttitle_fontsize: {
            type: 'string',
            source: 'attribute',
            attribute: 'data-fontsize',
            selector: '.caption-title',
            default : '26'
          },
          texttitle_color: {
            type: 'string',
            source: 'attribute',
            attribute: 'data-color',
            selector: '.caption-title',
            default : '#ffffff'
          },
          textsubtitle: {
            type: 'array',
            source: 'html',
            selector: '.caption-subtitle',
          },
          textsubtitle_fontsize: {
            type: 'string',
            source: 'attribute',
            attribute: 'data-fontsize',
            selector: '.caption-subtitle',
            default : '14'
          },
          textsubtitle_color: {
            type: 'string',
            source: 'attribute',
            attribute: 'data-color',
            selector: '.caption-subtitle',
            default : '#ffffff'
          },

        },
      },
    },


    edit: function( props ) {
      var blockID = props.attributes.blockID,
      mode = props.attributes.mode,
      loop = props.attributes.loop,
      speed = props.attributes.speed,
      autoplay = props.attributes.autoplay,
      delay = props.attributes.delay,
      direction = props.attributes.direction,
      slidesPerView = props.attributes.slidesPerView,
      valueH = props.attributes.valueH,
      images = props.attributes.images,
      Overlaycolor = props.attributes.Overlaycolor,
      isTextShow = props.attributes.isTextShow,
      Textalignment = props.attributes.Textalignment,
      arrowShow = props.attributes.arrowShow,
      pointerShow = props.attributes.pointerShow,
      pointerType = props.attributes.pointerType,
      dynamicBullets = props.attributes.dynamicBullets,
      navpointcolor = props.attributes.navpointcolor,
      option = props.attributes.option;
      //console.log(images);
      const swiperRef = useRef(null);
      const texttitle = useRef(null);
      const textsubtitle = useRef(null);
      const [ istextfocus, settextfocus ] = useState( false );
      const [ issubtextfocus, setsubtextfocus ] = useState( false );

      const [textcolor, settextColor] = useState('#ffffff');
      const [textsize, settextsize] = useState('14');
      
      const [ isOpen, setOpen ] = useState( false );
      const openModal = () => setOpen(true);
      const closeModal = () => setOpen(false);

      const [ isOpenTextAlign, setOpenTextAlign ] = useState( false );
      const openModalTextAlign = () => setOpenTextAlign(true);
      const closeModalTextAlign = () => setOpenTextAlign(false);
      
      const unitsH = [
          { value: 'px', label: 'px', default: 0 },
          { value: '%', label: '%', default: 10 },
          { value: 'vh', label: 'vh', default: 0 },
      ];
      const onSelect = items => {
        var countI = 0;
        var prepropimages = images;
        var Textalignment = 'center center';
        var texttitle = "";
        var texttitle_fontsize = 26;
        var texttitle_color = '#ffffff';
        var textsubtitle = "";
        var textsubtitle_fontsize = 14;
        var textsubtitle_color = '#ffffff';
        //console.log(prepropimages);
        props.setAttributes({
          images: items.map(item => {
            countI++;
            //console.log(item);
                prepropimages.map(arr => {
                  if(arr.mediaURL == item.sizes.image_HD.url){
                    Textalignment = arr.Textalignment;
                    texttitle =arr.texttitle;
                    texttitle_fontsize = arr.texttitle_fontsize;
                    texttitle_color = arr.texttitle_color;
                    textsubtitle =arr.textsubtitle;
                    textsubtitle_fontsize = arr.textsubtitle_fontsize;
                    textsubtitle_color = arr.textsubtitle_color;
                  }
                })
            return {
              focalPointX:"0.5",
              focalPointY:"0.5",
              countI: countI,
              mediaID: parseInt(item.id, 10),
              mediaURL: item.sizes.image_HD.url,
              thumbnail: item.sizes.thumbnail.url,
              Textalignment: Textalignment,
              texttitle: texttitle,
              texttitle_fontsize: texttitle_fontsize,
              texttitle_color: texttitle_color,
              textsubtitle: textsubtitle,
              textsubtitle_fontsize: textsubtitle_fontsize,
              textsubtitle_color: textsubtitle_color
            };
          })
        });
        props.setAttributes({ regeventDOM : props.attributes.regeventDOM ? 0 : 1 });
      };
      
      var blockPropsCarousel = useBlockProps({
        className: 'bc_slide',
        style:{'height': valueH}
      });
      
      if(blockID==0){
        props.setAttributes({ blockID : blockPropsCarousel.id });
      }

      useEffect(() => {
        
        if (swiperRef.current && swiperRef.current.initialized) {
          // Destroy Swiper instance when updating.
          swiperRef.current.destroy(true, true);
        }
        var optnavigation = arrowShow ? { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' } : false;
        var optpagination = pointerShow ? { el: '.swiper-pagination', type: 'bullets', clickable: true, dynamicBullets: dynamicBullets ? true : false} : false;
        
        swiperRef.current = new Swiper('#'+blockPropsCarousel.id+' .swiper', {
          direction: animation(mode)['directionvertical'] ? direction : 'horizontal', 
          speed: speed, 
          loop: loop,
          effect: animation(mode)['effect'],
          navigation: optnavigation, 
          pagination: optpagination,
          allowTouchMove: false,
          slidesPerView: slidesPerView,
          on: {
            init: function () {
              //console.log(blockPropsCarousel.id);
              
              jQuery('#'+blockPropsCarousel.id+' .swiper').css("--swiper-navigation-color",navpointcolor);
              jQuery('#'+blockPropsCarousel.id+' .swiper').css("--swiper-pagination-color",navpointcolor);
              jQuery('#'+blockPropsCarousel.id+' .swiper').css("--swiper-pagination-bullet-inactive-color",navpointcolor);
              jQuery('#'+blockPropsCarousel.id+' .swiper').css("--swiper-pagination-bullet-inactive-opacity","0.4");
            }
          },
          creativeEffect: animation(mode)['creativeEffect'],
          option
        });
        

        setTimeout(() => {
          swiperRef.current.slideNext(speed);
          swiperRef.current.on('transitionEnd', function () {
            setTimeout(() => {
              swiperRef.current.slidePrev(speed,false);
              swiperRef.current.off('transitionEnd');
            }, 300);
            
          });
        }, 300);

        jQuery('#'+blockPropsCarousel.id+' .richtext-title').focus(function (e) { 
          e.preventDefault();
          settextfocus(true);
          setsubtextfocus(false);
          texttitle.current = this;
          textsubtitle.current = null;
          settextsize(jQuery(texttitle.current).data('fontsize'))
          settextColor(jQuery(texttitle.current).data('color'));
        });
        jQuery('#'+blockPropsCarousel.id+' .richtext-subtitle').focus(function (e) { 
          e.preventDefault();
          settextfocus(false);
          setsubtextfocus(true);
          texttitle.current = null;
          textsubtitle.current = this;
          settextsize(jQuery(textsubtitle.current).data('fontsize'))
          settextColor(jQuery(textsubtitle.current).data('color'));
        });
        
        jQuery('#'+blockPropsCarousel.id).focus(function (e) { 
          e.preventDefault();
          settextfocus(false);
          setsubtextfocus(false);
          texttitle.current = null;
          textsubtitle.current = null;
        });
        jQuery('.swiper-button-next, .swiper-button-prev, .swiper-pagination').click(function (e) { 
          e.preventDefault();
          settextfocus(false);
          setsubtextfocus(false);
          texttitle.current = null;
          textsubtitle.current = null;
        });

      }, [mode, loop, speed, direction, slidesPerView, arrowShow, pointerShow, pointerType, dynamicBullets, navpointcolor, props.attributes.align, props.attributes.regeventDOM,isTextShow]);
      
      const fontSizes = [
          {
              name: 'Small',
              slug: 'small',
              size: 14,
          },
          {
              name: 'Medum',
              slug: 'medium',
              size: 26,
          },
          {
              name: 'Big',
              slug: 'big',
              size: 32,
          },
      ];

      return (
                
        el( Fragment, {},
          el( InspectorControls, {},
            (istextfocus || issubtextfocus) ? 
            
            images.map((arr,key) => 
              ((arr.mediaURL == jQuery(texttitle.current).data('slide')) || (arr.mediaURL == jQuery(textsubtitle.current).data('slide'))) ?

                el(TabPanel, {
                  className: "bcslide-tab-panel",
                  tabs: [{
                    name: 'fontrichtext',
                    title: 'Tipografia',
                    className: 'bcslide-tab-fontrichtext',
                    icon: 'editor-textcolor'
                  }],
                  children: tab => {
                    return el('div',{
                      className: 'texttyp',
                      style:{
                        padding: '10px'
                      }
                    },
                      
                    istextfocus ? el(FontSizePicker, {
                        value: textsize,
                        fontSizes: fontSizes,
                        __nextHasNoMarginBottom : true,
                        onChange : ( value ) => {
                          settextsize(value);
                              images[key].texttitle_fontsize = value;
                              jQuery(texttitle.current).css('font-size',value);
                              jQuery(texttitle.current).data('fontsize',value);
                            
                        },
                      }):el(FontSizePicker, {
                        value: textsize,
                        fontSizes: fontSizes,
                        __nextHasNoMarginBottom : true,
                        onChange : ( value ) => {
                          settextsize(value);
                              images[key].textsubtitle_fontsize = value;
                              jQuery(textsubtitle.current).css('font-size',value);
                              jQuery(textsubtitle.current).data('fontsize',value);
                            
                        },
                      }),
                      

                      istextfocus ? el(ColorPicker , {
                        label: 'Colore',
                        color: textcolor,
                        enableAlpha: true,
                        __nextHasNoMarginBottom : true,
                        onChange : ( value ) => {
                          
                          settextColor(value);
                              images[key].texttitle_color = value;
                              jQuery(texttitle.current).css('color',value);
                              jQuery(texttitle.current).data('color',value);
                            
                      },
                      }):el(ColorPicker , {
                        label: 'Colore',
                        color: textcolor,
                        enableAlpha: true,
                        __nextHasNoMarginBottom : true,
                        onChange : ( value ) => {
                          settextColor(value);
                              images[key].textsubtitle_color = value;
                              jQuery(textsubtitle.current).css('color',value);
                              jQuery(textsubtitle.current).data('color',value);
                           
                      },
                      })
                      
                    )
                  }
                })
              :null
            )
            
            :el(TabPanel, {
              className: "bcslide-tab-panel",
              tabs: [{
                name: 'slides',
                title: 'Immagini',
                className: 'bcslide-tab-slides',
                icon: 'slides'
              }, {
                name: 'settings',
                title: 'Impostazioni',
                className: 'bcslide-tab-settings',
                icon: 'admin-generic'
              }, {
                name: 'appearance',
                title: 'Aspetto',
                className: 'bcslide-tab-appearance',
                icon: 'admin-appearance'
              }],
              children: tab => 
              {
                if(tab.name=='slides'){
                  return el('div',{},
                    el(PanelBody,{},
                        el(MyMediaUploader, {
                        mediaIDs: images.map(item => item.mediaID),
                        onSelect: onSelect
                      }),
                      el(Button, {
                        className: "button button-small",
                        onClick: openModal,
                        children: "Posizionamento immagini",
                        style:{
                          "margin-top":"15px"
                        }
                      }),
                      isOpen ?
                      el(Modal, {
                          title: "Posizionamento immagini",
                          onRequestClose: closeModal,
                          children: 
                          images.map(item =>
                            el("div",{
                                className: "item_focalpointpicker"+item.countI,
                                style:{
                                  width: "200px",
                                  display: "inline-block",
                                  margin: "5px"
                                }
                              },
                              el(FocalPointPicker,{
                                url: item.mediaURL,
                                __nextHasNoMarginBottom : true,
                                value: {x:Number(item.focalPointX),y:Number(item.focalPointY)},
                                
                                onChange: ( value ) => {
                                  
                                  setTimeout(() => {
                                    document.querySelector('.components-modal__screen-overlay').classList.remove("drag_modal_background");
                                    document.querySelector('.components-modal__frame').classList.remove("drag_modal_background");
                                    document.querySelector('.components-modal__header').classList.remove("drag_modal_opacity");
                                    document.querySelector('.components-modal__content').classList.remove("drag_modal_opacity");
                                    document.querySelectorAll('.components-modal__content > div').forEach(element => {
                                      if(!element.classList.contains("item_focalpointpicker"+item.countI)){
                                        element.classList.remove("drag_modal_opacity");
                                      }else{
                                        element.querySelector('.focal-point-picker__controls').classList.remove("drag_modal_opacity");
                                      }
                                    });
                                  }, 800);
                                  
                                },
                                onDrag: (value) => {
                                  props.setAttributes({
                                    images: images.map(img => {
                                      if(img.mediaURL==item.mediaURL){
                                        img.focalPointX = String(value.x);
                                        img.focalPointY = String(value.y);
                                      }
                                      return img;
                                    })
                                  });
                                  
                                  swiperRef.current.slideTo(item.countI-1);
                                  document.querySelector('.components-modal__screen-overlay').classList.add("drag_modal_background");
                                  document.querySelector('.components-modal__frame').classList.add("drag_modal_background");
                                  document.querySelector('.components-modal__header').classList.add("drag_modal_opacity");
                                  //document.querySelector('.components-modal__content *').classList.add("drag_modal_opacity");
                                  document.querySelectorAll('.components-modal__content > div').forEach(element => {
                                    if(!element.classList.contains("item_focalpointpicker"+item.countI)){
                                      element.classList.add("drag_modal_opacity");
                                    }else{
                                      element.querySelector('.focal-point-picker__controls').classList.add("drag_modal_opacity");
                                    }
                                    
                                  });
                                }
                              })
                            )
                          )

                      })
                      :null,
                      isTextShow == 'slide' ? el(Button, {
                        className: "button button-small",
                        onClick: openModalTextAlign,
                        children: "Posizionamento testo",
                        style:{
                          "margin-top":"15px"
                        }
                      }):null,
                      isOpenTextAlign ?
                      el(Modal, {
                        title: "Posizionamento testo",
                        onRequestClose: closeModalTextAlign,
                        children: 
                        images.map(item =>
                          el("div",{
                              className: "item_TextAlign"+item.countI,
                              style:{
                                width: "200px",
                                display: "inline-block",
                                margin: "5px"
                              }
                            },
                            el(AlignmentMatrixControl, {
                              label: 'Posizione testo',
                              value: item.Textalignment,
                              __nextHasNoMarginBottom : true,
                              onChange: ( value ) => {
                                props.setAttributes({
                                  images: images.map(img => {
                                    if(img.mediaURL==item.mediaURL){
                                      item.Textalignment = value;
                                    }
                                    return img;
                                  })
                                });
                              },
                            })
                          )
                        )

                    }):null
                    )
                  )
                };
                if(tab.name=='settings'){
                  return el('div',{},
                    el(PanelBody,{icon: el('img',{
                      src: plugin_dir_url.assets+'gif/effect.gif',
                      style:{
                        width: '32px'
                      }
                    }) ,title: 'Animazione',initialOpen: false},
                      el('img',{
                        src: plugin_dir_url.assets+'gif/effect.gif',
                        style:{
                          width: '100px'
                        }
                      }),
                      el(SelectControl,{
                        value: mode,
                        __nextHasNoMarginBottom : true,
                        options: [
                            {
                                "value": "slide",
                                "label": "Slide"
                            },
                            {
                                "value": "fade",
                                "label": "Fade"
                            },
                            {
                                "value": "flip",
                                "label": "Flip"
                            },
                            {
                                "value": "creative5",
                                "label": "Flip alt"
                            },
                            {
                                "value": "cube",
                                "label": "Cube"
                            },
                            {
                                "value": "cards",
                                "label": "Cards"
                            },
                            {
                                "value": "coverflow",
                                "label": "Coverflow"
                            },
                            {
                                "value": "creative1",
                                "label": "Slide/Zoom out"
                            },
                            {
                                "value": "creative2",
                                "label": "Fade/Zoom out"
                            },
                            {
                                "value": "creative3",
                                "label": "Fade/Zoom in"
                            },
                            {
                                "value": "creative4",
                                "label": "Slide/Parallax"
                            }
                        ],
                        onChange: ( value ) => {
                          props.setAttributes( { mode: value } );
                        },
                      }),
                      animation(mode)['directionvertical'] ? el(RadioControl, {
                        label: "Direzione",
                        selected: direction,
                        __nextHasNoMarginBottom : true,
                        options: [{
                          label: 'Orizzontale',
                          value: 'horizontal'
                        },{
                          label: 'Verticale',
                          value: 'vertical'
                        }],
                        onChange: ( value ) => {
                          props.setAttributes( { direction: value } );
                        }
                      }):null,
                      el(TextControl,{
                        label: 'Velocità animazione (ms)',
                        value: speed,
                        __nextHasNoMarginBottom : true,
                        type: 'number',
                        onChange: ( value ) => {
                            props.setAttributes( { speed: value } );
                          
                        },
                      })
                    ),
                    el(PanelBody,{icon: el('img',{
                      src: plugin_dir_url.assets+'gif/multiple.gif',
                      style:{
                        width: '32px'
                      }
                    }) ,title: 'Slides Per View',initialOpen: false},
                      el('img',{
                        src: plugin_dir_url.assets+'gif/multiple.gif',
                        style:{
                          width: '100px'
                        }
                      }),
                      el(TextControl,{
                        label: '',
                        __nextHasNoMarginBottom : true,
                        value: slidesPerView,
                        type: 'number',
                        onChange: ( value ) => {
                            props.setAttributes( { slidesPerView: value } );
                          
                        },
                      })
                    ),
                    el(PanelBody,{icon: el('img',{
                      src: plugin_dir_url.assets+'gif/autoplay.gif',
                      style:{
                        width: '32px'
                      }
                    }) ,title: 'Autoplay',initialOpen: false},
                      el('img',{
                        src: plugin_dir_url.assets+'gif/autoplay.gif',
                        style:{
                          width: '100px'
                        }
                      }),
                      el(CheckboxControl,{
                        label: 'Abitilia',
                        checked: autoplay,
                        __nextHasNoMarginBottom : true,
                        onChange: ( value ) => {
                          props.setAttributes( { autoplay: value } );
                        },
                      }),
                      autoplay ? el(TextControl,{
                        label: 'Delay (ms)',
                        value: delay,
                        type: 'number',
                        onChange: ( value ) => {
                          props.setAttributes( { delay: value } );
                        },
                      }):null
                    ),
                    el(PanelBody,{icon: el('img',{
                      src: plugin_dir_url.assets+'gif/loop.gif',
                      style:{
                        width: '32px'
                      }
                    }) ,title: 'Loop',initialOpen: false},
                      el(CheckboxControl,{
                        label: 'Abitilia',
                        __nextHasNoMarginBottom : true,
                        checked: loop,
                        onChange: ( value ) => {
                            props.setAttributes( { loop: value } );
                        },
                      })
                    ),
                    el(PanelBody,{icon: el('img',{
                      src: plugin_dir_url.assets+'gif/testo.gif',
                      style:{
                        width: '32px'
                      }
                    }) ,title: 'Testo',initialOpen: false},
                      el('img',{
                        src: plugin_dir_url.assets+'gif/testo.gif',
                        style:{
                          width: '100px'
                        }
                      }),
                      el(RadioControl, {
                        label: "Abilita",
                        selected: isTextShow,
                        __nextHasNoMarginBottom : true,
                        options: [{
                          label: 'No',
                          value: '0'
                        },{
                          label: 'Single',
                          value: 'single'
                        },{
                          label: 'Slide',
                          value: 'slide'
                        }],
                        onChange: ( value ) => {
                          props.setAttributes( { isTextShow: value } );
                        }
                      }),
                      isTextShow == 'single' ? el(AlignmentMatrixControl, {
                        label: 'Posizione testo',
                        __nextHasNoMarginBottom : true,
                        value: Textalignment,
                        onChange: ( value ) => {
                          props.setAttributes( { Textalignment: value } );
                        },
                      }):null
                    ),
                    
                    el(PanelBody,{title: 'Altezza',initialOpen: false},
                      el(UnitControl, {
                        label: '',
                        __nextHasNoMarginBottom : true,
                        className: 'w-UnitControl',
                        value: valueH,
                        units: unitsH,
                        onChange : ( value ) => {
                          props.setAttributes( { valueH: value } );
                        },
                      })
                    )
                  )
    
                  
                };
                if(tab.name=='appearance'){
                  return el('div',{},
                    el(PanelBody,{icon: el('img',{
                      src: plugin_dir_url.assets+'gif/navigation.gif',
                      style:{
                        width: '32px'
                      }
                    }) ,title: 'Frecce',initialOpen: false},
                      el('img',{
                        src: plugin_dir_url.assets+'gif/navigation.gif',
                        style:{
                          width: '100px'
                        }
                      }),
                      el(CheckboxControl,{
                        label: 'Abilita',
                        checked: arrowShow,
                        __nextHasNoMarginBottom : true,
                        onChange: ( value ) => {
                            props.setAttributes( { arrowShow: value } );
                        },
                      }),

                    ),
                    el(PanelBody,{icon: el('img',{
                      src: plugin_dir_url.assets+'gif/pagination.gif',
                      style:{
                        width: '32px'
                      }
                    }) ,title: 'Indicatori',initialOpen: false},
                      el('img',{
                        src: plugin_dir_url.assets+'gif/pagination.gif',
                        style:{
                          width: '100px'
                        }
                      }),
                      el(CheckboxControl,{
                        label: 'Abilita',
                        checked: pointerShow,
                        __nextHasNoMarginBottom : true,
                        onChange: ( value ) => {
                            props.setAttributes( { pointerShow: value } );
                        },
                      }),
                      pointerShow ? el(RadioControl, {
                        label: "Tipologia",
                        selected: pointerType,
                        __nextHasNoMarginBottom : true,
                        options: [{
                          label: 'Square',
                          value: 'square'
                        },{
                          label: 'Circle',
                          value: 'circle'
                        }],
                        onChange: ( value ) => {
                          props.setAttributes( { pointerType: value } );
                        }
                      }):null,
                      pointerShow ? el(CheckboxControl,{
                        label: 'Dynamic Bullets',
                        checked: dynamicBullets,
                        __nextHasNoMarginBottom : true,
                        onChange: ( value ) => {
                            props.setAttributes( { dynamicBullets: value } );
                        },
                      }):null,
                    ),
                    el(PanelBody,{icon: el('img',{
                      src: plugin_dir_url.assets+'gif/color.gif',
                      style:{
                        width: '32px'
                      }
                    }) ,title: 'Colore',initialOpen: false},
                      el('img',{
                        src: plugin_dir_url.assets+'gif/color.gif',
                        style:{
                          width: '100px'
                        }
                      }),
                      el(ColorPalette , {
                        label: 'Colore',
                        value: navpointcolor,
                        __nextHasNoMarginBottom : true,
                        enableAlpha: false,
                        onChange : ( value ) => {
                          props.setAttributes( { navpointcolor: value } );
                      },
                      })
                    ),
                    el(PanelBody,{title: 'Sovrapposizione',initialOpen: false},
                      el(ColorPalette , {
                        label: 'Overlay',
                        __nextHasNoMarginBottom : true,
                        value: Overlaycolor,
                        enableAlpha: true,
                        onChange : ( value ) => {
                          props.setAttributes( { Overlaycolor: value } );
                      },
                      })
                    ),
                  )
                };
              }
            }),


          ),
          el(
            BlockControls,
            { key: 'controls' },
            el(ToolbarGroup, {}, 
              el(MyMediaUploader, {
                mediaIDs: images.map(item => item.mediaID),
                onSelect: onSelect,
                toolbar: true
              }),
              
              el(ToolbarDropdownMenu,{
                title: 'Altezza',
                icon: 'editor-expand',
                controls: [
                  {
                    title: 'Altezza piena',
                    icon: 'align-full-width',
                    onClick : ( value ) => {
                      props.setAttributes( { valueH: '100vh' } );
                    }
                  },
                  {
                    title: '500px',
                    icon: 'align-wide',
                    onClick : ( value ) => {
                      props.setAttributes( { valueH: '500px' } );
                    }
                  }
                ]
              }),
              isTextShow == 'single' ? el(ToolbarDropdownMenu,{
                title: 'Posizione testo',
                icon: AlignmentMatrixControl.Icon,
                __nextHasNoMarginBottom : true,
                children: ({
                  onClose
                }) =>
                  el(AlignmentMatrixControl, {
                    value: Textalignment,
                    onChange: ( value ) => {
                      props.setAttributes( { Textalignment: value } );
                    },
                  })
                
              }):null
            ),
          ),
          el(InspectorAdvancedControls,{},
            el(TextControl,{
              label: 'ID slide',
              __nextHasNoMarginBottom : true,
              value: blockID,
              onChange: ( value ) => {
                props.setAttributes( { blockID: value } );
                
              },
            }),
            el(TextareaControl,{
              label: 'Opzioni aggiuntivi',
              value: option,
              __nextHasNoMarginBottom : true,
              onChange: ( value ) => {
                props.setAttributes( { option: value } );
                
              },
            })
          ),
          el("div", blockPropsCarousel, 
            el("div",{
              className: "swiper",
              style:{
                "--swiper-navigation-color": navpointcolor,
                "--swiper-pagination-color": navpointcolor,
                "--swiper-pagination-bullet-inactive-color": navpointcolor,
                "--swiper-pagination-bullet-inactive-color": navpointcolor,
                "--swiper-pagination-bullet-inactive-opacity": '0.4'
              }
            },
            el("div", {
              className: "swiper-wrapper"
              }, 
              images.map(item => el("div", 
                {
                  className: "swiper-slide",
                  key: 'image-' + item.mediaID
                }, 
                el("img", 
                  {
                    src: item.mediaURL,
                    style:{
                      "object-position": Number(item.focalPointX) * 100 + "% " + Number(item.focalPointY) * 100 + "%"
                    }
                  }
                ),
                isTextShow == 'slide' ? el("div",{
                  className: 'swiper-overlay',
                  style:{'background-color': Overlaycolor},
                },
                el("div",{
                    className: 'swiper-caption',
                    style:alignText(item.Textalignment)
                  },
                  el(RichText,{
                    tagName: 'h2',
                    className: "richtext-title",
                    value : item.texttitle,
                    __nextHasNoMarginBottom : true,
                    'data-slide': item.mediaURL,
                    'data-fontsize': item.texttitle_fontsize,
                    'data-color': item.texttitle_color,
                    allowedFormats: [ 'core/link', 'core/italic' ], 
                    placeholder: 'Enter title...',
                    style:{
                      'font-size':item.texttitle_fontsize+'px',
                      'color':item.texttitle_color
                    },
                    onChange: ( value ) => {
                      item.texttitle =  value;
                    },
                  }),
                  el(RichText,{
                    tagName: 'p',
                    className: "richtext-subtitle",
                    value : item.textsubtitle,
                    __nextHasNoMarginBottom : true,
                    'data-slide': item.mediaURL,
                    'data-fontsize': item.textsubtitle_fontsize,
                    'data-color': item.textsubtitle_color,
                    allowedFormats: [ 'core/link', 'core/italic' ], 
                    placeholder: 'Enter side content...',
                    style:{
                      'font-size':item.textsubtitle_fontsize+'px',
                      'color':item.textsubtitle_color
                    },
                    onChange: ( value ) => {
                      item.textsubtitle =  value;
                    },
                  })
                )
                ):null
                
              )),
              
            ),
            images.length == 0 ? el("div", {
              style:{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                'z-index': '9999'
              }
            }, el(MyMediaUploader, {
              mediaIDs: images.map(item => item.mediaID),
              onSelect: onSelect,
              toolbar: true
            })
            ):null,

            images.length >= 1 ? isTextShow == 'single' ? el("div",{
                className: 'swiper-overlay',
                style:{'background-color': Overlaycolor}
              }):null:null,
              images.length >= 1 ? isTextShow == 'single' ? el("div",{
                className: 'swiper-caption',
                style:alignText(Textalignment)
              },el(InnerBlocks,{
                "title": "Caption",
                template: [ 
                  [ 'core/heading', { placeholder: 'Enter title...',fontSize: 'large','textColor': 'white' } ],
                  [ 'core/paragraph', { placeholder: 'Enter side content...', 'textColor': 'white' } ]
                ],
                allowedBlocks: ['core/paragraph','core/heading','core/button','core/spacer'],
                orientation: "vertical"
                
              })):null:null,
              images.length >= 1 ? arrowShow ? el("div",{
                className : "swiper-button-prev"
                }
              ):null:null,
              images.length >= 1 ? arrowShow ? el("div",{
                className : "swiper-button-next"
                }
              ):null:null,
              images.length >= 1 ? pointerShow ?  el("div",{
                  className: "swiper-pagination " + pointerType
                }
              ):null:null,

            )
          ),
          
        )
              
      )
    },

    save: function(props) {
      
      var blockPropscarousel = useBlockProps.save({
        className: 'bc_slide swiper',
        id : props.attributes.blockID,
        'data-ride': 'swiper',
        style:{
          'height': props.attributes.valueH,
          "--swiper-navigation-color": props.attributes.navpointcolor,
          "--swiper-pagination-color": props.attributes.navpointcolor,
          "--swiper-pagination-bullet-inactive-color": props.attributes.navpointcolor,
          "--swiper-pagination-bullet-inactive-color": props.attributes.navpointcolor,
          "--swiper-pagination-bullet-inactive-opacity": '0.4'
        }
      });
      var animdirection = animation(props.attributes.mode)['directionvertical'] ? props.attributes.direction : 'horizontal';
      var autoplay = props.attributes.autoplay ? "autoplay: {delay: "+props.attributes.delay+",disableOnInteraction: false,pauseOnMouseEnter: true}," :"";
      var dynamicBullets = props.attributes.dynamicBullets ? true : false;
      var optnavigation = props.attributes.arrowShow ? "{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }" : false;
      var optpagination = props.attributes.pointerShow ? "{ el: '.swiper-pagination', type: 'bullets', clickable: true, dynamicBullets: "+dynamicBullets+" }" : false;

      return el("div", blockPropscarousel, el("div", {
        className: "swiper-wrapper"
      }, 
        props.attributes.images.map(item => el("div", 
          {
            className:  item.countI == 1 ? "swiper-slide active" : "swiper-slide",
            key: 'image-' + item.mediaID
          }, 
          el("img", 
            {
              "data-focalpointx": String(item.focalPointX),
              "data-focalpointY": String(item.focalPointY),
              'data-count': item.countI,
              src: item.mediaURL,
              "data-id": item.mediaID,
              "data-thumb": item.thumbnail,
              'data-textalignment': item.Textalignment,
              style:{
                "object-position": Number(item.focalPointX) * 100 + "% " + Number(item.focalPointY) * 100 + "%"
              }
            }
          ),
          props.attributes.isTextShow == 'slide' ? el("div",{
            className: 'swiper-overlay',
            style:{'background-color': props.attributes.Overlaycolor},
            },
            el("div",{
              className: 'swiper-caption',
              
              style:alignText(item.Textalignment)
            },
            /*el('h2',{
              className: 'caption-title',
            },item.texttitle),
            el('p',{
              className: 'caption-subtitle',
            },item.textsubtitle)*/
              el(wp.blockEditor.RichText.Content,{
                className: 'caption-title',
                tagName: 'h2', 
                value: item.texttitle,
                'data-fontsize': item.texttitle_fontsize,
                'data-color': item.texttitle_color,
                style:{
                  'font-size':item.texttitle_fontsize+'px',
                  'color':item.texttitle_color
                }
              }),
              el(wp.blockEditor.RichText.Content,{
                className: 'caption-subtitle',
                tagName: 'p', 
                value: item.textsubtitle,
                'data-fontsize': item.textsubtitle_fontsize,
                'data-color': item.textsubtitle_color,
                style:{
                  'font-size':item.textsubtitle_fontsize+'px',
                  'color':item.textsubtitle_color
                }
              })
            ),
            
            
          ):null
          
        )),
        ),
        props.attributes.isTextShow == 'single' ? el("div",{
          className: 'swiper-overlay',
          style:{'background-color': props.attributes.Overlaycolor}
        }):null,
        props.attributes.isTextShow == 'single' ? el("div",{className:'container container-swiper-caption'},el("div",{className:'swiper-caption',style:alignText(props.attributes.Textalignment)},el(InnerBlocks.Content))):null,
        props.attributes.arrowShow ? el("div",{
          className : "swiper-button-prev"
          }
        ):null,
        props.attributes.arrowShow ? el("div",{
          className : "swiper-button-next"
          }
        ):null,
        /*props.attributes.pointerShow ?  el("ol",{
            className: "swiper-pagination " + props.attributes.pointerType
          },
          props.attributes.images.map(item => el("li", 
              {
                className: item.countI == 1 ? "active" : "",
                "data-target": "#"+blockPropscarousel.id,
                "data-slide-to": item.countI - 1
              }
            )
          )
        ):null*/
        props.attributes.pointerShow ?  el("div",{
          className: "swiper-pagination " + props.attributes.pointerType
        }
      ):null,
      
      el("script",{},"new Swiper('#"+blockPropscarousel.id+"', {"+autoplay+" direction: '"+animdirection+"',slidesPerView: "+props.attributes.slidesPerView+", speed: "+props.attributes.speed+", loop: "+props.attributes.loop+", effect: '"+animation(props.attributes.mode)['effect']+"',navigation: "+optnavigation+", pagination: "+optpagination+",creativeEffect: "+JSON.stringify(animation(props.attributes.mode)['creativeEffect'])+ props.attributes.option +"});")

      );
      
    }



  })
  
} )( window.wp.blocks, window.wp.element, window.wp.components );
