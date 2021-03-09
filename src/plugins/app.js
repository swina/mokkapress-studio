
/**
 * Main menu
 * @label       => Menu title
 * @icon        => Icon
 * @component   => Component invoked
 * @filter      => Default filter (if applicable)
 * @items       => Submenu items
 * Submenus
 * same as Main menu 
 */
const menu = {
    items : [
        { label: 'Home' , icon: 'home' , component: 'MokaHome' , filter: '' },
        
        { label: 'Blocks' , icon: 'widgets' , component: 'MokaList' , filter: '' , 
            items: [
                { label: 'Widgets' , icon: '' , component: 'MokaList' , filter: 'widget' },
                { label: 'Pages' , icon: '' , component: 'MokaList' , filter: 'page' },
                { label: 'Templates' , icon: '' , component: 'MokaList' , filter: 'template' },
                { label: 'Sliders' , icon: '' , component: 'MokaList' , filter: 'slider' },
                { label: 'Components' , icon: '' , component: 'MokaList' , filter: 'component' },
                { label: 'Archive' , icon: '' , component: 'MokaList' , filter: 'archive' },
                { label: 'Favorites' , icon: '' , component: 'MokaList' , filter: 'starred' },
            ] 
        },
        { label: 'Themes' , icon: 'web' , component: 'MokaThemes' , filter: ''},
        { label: 'Strapi CMS' , icon: 'article' , component: null , 
            items : [
                { label: 'Articles' , icon: 'article' , component: 'MokaArticles' , filter: 'article' },
                { label: 'Categories' , icon: 'category' , component: 'MokaCategories' , filter: 'category' }
            ]
        },
        { label: 'Media' , icon: 'photo' , component: 'MokaMedia' , filter: 'manager' },
        { label: 'Shop' , icon: 'shopping_cart' , component: null , filter: 'manager' ,
            items: [
                { label: 'Products' , icon: 'article' , component: 'MokaProducts' , filter: 'products' },
                { label: 'Configuration' , icon: 'settings' , component: 'MokaShop' , filter: 'configure' },
            ]
        }, 
        { label: 'Plugins' , icon: 'settings_input_component' , component: 'MokaPlugins' , filter: 'plugins' }, 
        { label: 'Settings' , icon: 'settings' , component: 'MokaSettings' , filter: '' },
        { label: 'Remote' , icon: 'dynamic_form' , component: null , filter: 'remote' ,
            items: [
                { label: 'Staging' , icon: 'dns' , component: 'MokaStage' , filter: 'staging' },
                { label: 'Publish' , icon: 'dynamic_form' , component: 'MokaDeploy' , filter: 'publish' },

            ]
        },
        //{ label: 'Build' , icon: 'dynamic_form' , component: 'MokaBuild' , filter: '' },
        { label: 'Grid Templates' , icon: 'grid_on' , component: 'MokaGrid' , filter: 'demo' },
        
    ]
}

export default menu