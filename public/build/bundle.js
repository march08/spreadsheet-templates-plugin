
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.38.2' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const searchKeyword = writable('');

    /* src/Content/CategoryItem.svelte generated by Svelte v3.38.2 */

    const file$5 = "src/Content/CategoryItem.svelte";

    function create_fragment$5(ctx) {
    	let div4;
    	let a0;
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t0;
    	let div1;
    	let div0;
    	let t1_value = /*data*/ ctx[0].description + "";
    	let t1;
    	let a0_href_value;
    	let t2;
    	let a1;
    	let t3_value = /*data*/ ctx[0].name + "";
    	let t3;
    	let a1_href_value;
    	let t4;
    	let div3;
    	let div2;
    	let t5_value = /*data*/ ctx[0].description + "";
    	let t5;

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			a0 = element("a");
    			img = element("img");
    			t0 = space();
    			div1 = element("div");
    			div0 = element("div");
    			t1 = text(t1_value);
    			t2 = space();
    			a1 = element("a");
    			t3 = text(t3_value);
    			t4 = space();
    			div3 = element("div");
    			div2 = element("div");
    			t5 = text(t5_value);
    			if (img.src !== (img_src_value = /*data*/ ctx[0].imgUrl)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "loading", "lazy");
    			attr_dev(img, "alt", img_alt_value = /*data*/ ctx[0].name);
    			attr_dev(img, "class", "template-image");
    			add_location(img, file$5, 10, 4, 249);
    			attr_dev(div0, "class", "template-desc");
    			add_location(div0, file$5, 17, 6, 392);
    			attr_dev(div1, "class", "temp__desc svelte-ep8egi");
    			add_location(div1, file$5, 16, 4, 361);
    			attr_dev(a0, "data-w-id", "a9327e93-7efd-87e0-0692-2dfef0ff007b");
    			attr_dev(a0, "href", a0_href_value = `/template/${/*data*/ ctx[0].slug}`);
    			attr_dev(a0, "class", "temp__thumbnail w-inline-block svelte-ep8egi");
    			add_location(a0, file$5, 5, 2, 106);
    			attr_dev(a1, "href", a1_href_value = `/template/${/*data*/ ctx[0].slug}`);
    			attr_dev(a1, "class", "template__label");
    			add_location(a1, file$5, 22, 2, 480);
    			attr_dev(div2, "class", "template-desc");
    			add_location(div2, file$5, 24, 4, 593);
    			attr_dev(div3, "class", "temp__desc mobile svelte-ep8egi");
    			add_location(div3, file$5, 23, 2, 557);
    			attr_dev(div4, "role", "listitem");
    			attr_dev(div4, "class", "home__template w-dyn-item svelte-ep8egi");
    			add_location(div4, file$5, 4, 0, 48);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, a0);
    			append_dev(a0, img);
    			append_dev(a0, t0);
    			append_dev(a0, div1);
    			append_dev(div1, div0);
    			append_dev(div0, t1);
    			append_dev(div4, t2);
    			append_dev(div4, a1);
    			append_dev(a1, t3);
    			append_dev(div4, t4);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, t5);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*data*/ 1 && img.src !== (img_src_value = /*data*/ ctx[0].imgUrl)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*data*/ 1 && img_alt_value !== (img_alt_value = /*data*/ ctx[0].name)) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if (dirty & /*data*/ 1 && t1_value !== (t1_value = /*data*/ ctx[0].description + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*data*/ 1 && a0_href_value !== (a0_href_value = `/template/${/*data*/ ctx[0].slug}`)) {
    				attr_dev(a0, "href", a0_href_value);
    			}

    			if (dirty & /*data*/ 1 && t3_value !== (t3_value = /*data*/ ctx[0].name + "")) set_data_dev(t3, t3_value);

    			if (dirty & /*data*/ 1 && a1_href_value !== (a1_href_value = `/template/${/*data*/ ctx[0].slug}`)) {
    				attr_dev(a1, "href", a1_href_value);
    			}

    			if (dirty & /*data*/ 1 && t5_value !== (t5_value = /*data*/ ctx[0].description + "")) set_data_dev(t5, t5_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("CategoryItem", slots, []);
    	
    	let { data } = $$props;
    	const writable_props = ["data"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<CategoryItem> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    	};

    	$$self.$capture_state = () => ({ data });

    	$$self.$inject_state = $$props => {
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [data];
    }

    class CategoryItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { data: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CategoryItem",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*data*/ ctx[0] === undefined && !("data" in props)) {
    			console.warn("<CategoryItem> was created without expected prop 'data'");
    		}
    	}

    	get data() {
    		throw new Error("<CategoryItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<CategoryItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Content/ListEmptyState.svelte generated by Svelte v3.38.2 */

    const file$4 = "src/Content/ListEmptyState.svelte";

    function create_fragment$4(ctx) {
    	let div1;
    	let div0;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "Sorry, there are no results for this search.";
    			attr_dev(div0, "class", "h6 empty-message");
    			add_location(div0, file$4, 3, 2, 63);
    			attr_dev(div1, "class", "empty-search-wrap");
    			add_location(div1, file$4, 2, 0, 29);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ListEmptyState", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ListEmptyState> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class ListEmptyState extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ListEmptyState",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/Content/CategoryList.svelte generated by Svelte v3.38.2 */
    const file$3 = "src/Content/CategoryList.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (16:0) {:else}
    function create_else_block$1(ctx) {
    	let listemptystate;
    	let current;
    	listemptystate = new ListEmptyState({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(listemptystate.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(listemptystate, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(listemptystate.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(listemptystate.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(listemptystate, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(16:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (10:0) {#if items.length > 0}
    function create_if_block$1(ctx) {
    	let div;
    	let current;
    	let each_value = /*items*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "role", "list");
    			attr_dev(div, "id", /*id*/ ctx[0]);
    			attr_dev(div, "class", "templates__grid w-dyn-items");
    			add_location(div, file$3, 10, 2, 265);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*items*/ 2) {
    				each_value = /*items*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*id*/ 1) {
    				attr_dev(div, "id", /*id*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(10:0) {#if items.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (12:4) {#each items as item}
    function create_each_block$2(ctx) {
    	let categoryitem;
    	let current;

    	categoryitem = new CategoryItem({
    			props: { data: /*item*/ ctx[4] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(categoryitem.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(categoryitem, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const categoryitem_changes = {};
    			if (dirty & /*items*/ 2) categoryitem_changes.data = /*item*/ ctx[4];
    			categoryitem.$set(categoryitem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(categoryitem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(categoryitem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(categoryitem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(12:4) {#each items as item}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$1, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*items*/ ctx[1].length > 0) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let items;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("CategoryList", slots, []);
    	
    	let { id = "" } = $$props;
    	let { data } = $$props;
    	let { limit } = $$props;
    	const writable_props = ["id", "data", "limit"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<CategoryList> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("id" in $$props) $$invalidate(0, id = $$props.id);
    		if ("data" in $$props) $$invalidate(2, data = $$props.data);
    		if ("limit" in $$props) $$invalidate(3, limit = $$props.limit);
    	};

    	$$self.$capture_state = () => ({
    		CategoryItem,
    		ListEmptyState,
    		id,
    		data,
    		limit,
    		items
    	});

    	$$self.$inject_state = $$props => {
    		if ("id" in $$props) $$invalidate(0, id = $$props.id);
    		if ("data" in $$props) $$invalidate(2, data = $$props.data);
    		if ("limit" in $$props) $$invalidate(3, limit = $$props.limit);
    		if ("items" in $$props) $$invalidate(1, items = $$props.items);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*limit, data*/ 12) {
    			$$invalidate(1, items = !!limit ? data.slice(0, limit) : data);
    		}
    	};

    	return [id, items, data, limit];
    }

    class CategoryList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { id: 0, data: 2, limit: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CategoryList",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*data*/ ctx[2] === undefined && !("data" in props)) {
    			console.warn("<CategoryList> was created without expected prop 'data'");
    		}

    		if (/*limit*/ ctx[3] === undefined && !("limit" in props)) {
    			console.warn("<CategoryList> was created without expected prop 'limit'");
    		}
    	}

    	get id() {
    		throw new Error("<CategoryList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<CategoryList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get data() {
    		throw new Error("<CategoryList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<CategoryList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get limit() {
    		throw new Error("<CategoryList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set limit(value) {
    		throw new Error("<CategoryList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Content/MainContent.svelte generated by Svelte v3.38.2 */
    const file$2 = "src/Content/MainContent.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	return child_ctx;
    }

    // (61:0) {:else}
    function create_else_block(ctx) {
    	let div2;
    	let div0;
    	let t1;
    	let a;
    	let div1;
    	let t3;
    	let categorylist;
    	let t4;
    	let each_1_anchor;
    	let current;

    	categorylist = new CategoryList({
    			props: {
    				id: "temp-featured",
    				limit: 6,
    				data: /*featuredTemplates*/ ctx[5]
    			},
    			$$inline: true
    		});

    	let each_value = /*categories*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			div0.textContent = "Featured Templates";
    			t1 = space();
    			a = element("a");
    			div1 = element("div");
    			div1.textContent = "Explore all featured templates →";
    			t3 = space();
    			create_component(categorylist.$$.fragment);
    			t4 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    			attr_dev(div0, "class", "h6");
    			add_location(div0, file$2, 62, 4, 2013);
    			add_location(div1, file$2, 64, 6, 2133);
    			attr_dev(a, "href", `/templates-featured`);
    			attr_dev(a, "class", "explore-link w-inline-block");
    			add_location(a, file$2, 63, 4, 2058);
    			attr_dev(div2, "class", "templates__headline-wrap");
    			add_location(div2, file$2, 61, 2, 1970);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t1);
    			append_dev(div2, a);
    			append_dev(a, div1);
    			insert_dev(target, t3, anchor);
    			mount_component(categorylist, target, anchor);
    			insert_dev(target, t4, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*categories*/ 2) {
    				each_value = /*categories*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(categorylist.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(categorylist.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t3);
    			destroy_component(categorylist, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(61:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (56:29) 
    function create_if_block_2(ctx) {
    	let div1;
    	let div0;
    	let t0_value = /*activeCategoryData*/ ctx[4].name + "";
    	let t0;
    	let t1;
    	let categorylist;
    	let current;

    	categorylist = new CategoryList({
    			props: {
    				limit: null,
    				data: /*activeCategoryData*/ ctx[4].data
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			create_component(categorylist.$$.fragment);
    			attr_dev(div0, "class", "h6");
    			add_location(div0, file$2, 57, 4, 1840);
    			attr_dev(div1, "class", "templates__headline-wrap");
    			add_location(div1, file$2, 56, 2, 1797);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			insert_dev(target, t1, anchor);
    			mount_component(categorylist, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*activeCategoryData*/ 16) && t0_value !== (t0_value = /*activeCategoryData*/ ctx[4].name + "")) set_data_dev(t0, t0_value);
    			const categorylist_changes = {};
    			if (dirty & /*activeCategoryData*/ 16) categorylist_changes.data = /*activeCategoryData*/ ctx[4].data;
    			categorylist.$set(categorylist_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(categorylist.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(categorylist.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t1);
    			destroy_component(categorylist, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(56:29) ",
    		ctx
    	});

    	return block;
    }

    // (51:25) 
    function create_if_block_1(ctx) {
    	let div1;
    	let div0;
    	let t1;
    	let categorylist;
    	let current;

    	categorylist = new CategoryList({
    			props: {
    				limit: null,
    				data: /*featuredTemplates*/ ctx[5]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "Featured Templates";
    			t1 = space();
    			create_component(categorylist.$$.fragment);
    			attr_dev(div0, "class", "h6");
    			add_location(div0, file$2, 52, 4, 1658);
    			attr_dev(div1, "class", "templates__headline-wrap");
    			add_location(div1, file$2, 51, 2, 1615);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			insert_dev(target, t1, anchor);
    			mount_component(categorylist, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(categorylist.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(categorylist.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t1);
    			destroy_component(categorylist, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(51:25) ",
    		ctx
    	});

    	return block;
    }

    // (43:0) {#if isSearching}
    function create_if_block(ctx) {
    	let div2;
    	let div0;
    	let t1;
    	let a;
    	let div1;
    	let t3;
    	let categorylist;
    	let current;

    	categorylist = new CategoryList({
    			props: {
    				limit: null,
    				data: /*filteredItemsByKeyword*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			div0.textContent = "Search result";
    			t1 = space();
    			a = element("a");
    			div1 = element("div");
    			div1.textContent = "Back to all templates →";
    			t3 = space();
    			create_component(categorylist.$$.fragment);
    			attr_dev(div0, "class", "h6");
    			add_location(div0, file$2, 44, 4, 1366);
    			add_location(div1, file$2, 46, 6, 1472);
    			attr_dev(a, "href", `/templates`);
    			attr_dev(a, "class", "explore-link w-inline-block");
    			add_location(a, file$2, 45, 4, 1406);
    			attr_dev(div2, "class", "templates__headline-wrap");
    			add_location(div2, file$2, 43, 2, 1323);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t1);
    			append_dev(div2, a);
    			append_dev(a, div1);
    			insert_dev(target, t3, anchor);
    			mount_component(categorylist, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const categorylist_changes = {};
    			if (dirty & /*filteredItemsByKeyword*/ 8) categorylist_changes.data = /*filteredItemsByKeyword*/ ctx[3];
    			categorylist.$set(categorylist_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(categorylist.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(categorylist.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t3);
    			destroy_component(categorylist, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(43:0) {#if isSearching}",
    		ctx
    	});

    	return block;
    }

    // (72:6) {#if category.data.length > 3}
    function create_if_block_3(ctx) {
    	let a;
    	let div;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			div = element("div");
    			div.textContent = "Explore all →";
    			add_location(div, file$2, 76, 10, 2548);
    			attr_dev(a, "href", a_href_value = `/category/${/*category*/ ctx[9].slug}`);
    			attr_dev(a, "class", "explore-link w-inline-block");
    			add_location(a, file$2, 72, 8, 2433);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, div);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*categories*/ 2 && a_href_value !== (a_href_value = `/category/${/*category*/ ctx[9].slug}`)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(72:6) {#if category.data.length > 3}",
    		ctx
    	});

    	return block;
    }

    // (69:2) {#each categories as category}
    function create_each_block$1(ctx) {
    	let div1;
    	let div0;
    	let t0_value = /*category*/ ctx[9].name + "";
    	let t0;
    	let t1;
    	let t2;
    	let categorylist;
    	let current;
    	let if_block = /*category*/ ctx[9].data.length > 3 && create_if_block_3(ctx);

    	categorylist = new CategoryList({
    			props: { limit: 3, data: /*category*/ ctx[9].data },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			create_component(categorylist.$$.fragment);
    			attr_dev(div0, "class", "h6");
    			add_location(div0, file$2, 70, 6, 2350);
    			attr_dev(div1, "class", "templates__headline-wrap");
    			add_location(div1, file$2, 69, 4, 2305);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div1, t1);
    			if (if_block) if_block.m(div1, null);
    			insert_dev(target, t2, anchor);
    			mount_component(categorylist, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*categories*/ 2) && t0_value !== (t0_value = /*category*/ ctx[9].name + "")) set_data_dev(t0, t0_value);

    			if (/*category*/ ctx[9].data.length > 3) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_3(ctx);
    					if_block.c();
    					if_block.m(div1, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			const categorylist_changes = {};
    			if (dirty & /*categories*/ 2) categorylist_changes.data = /*category*/ ctx[9].data;
    			categorylist.$set(categorylist_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(categorylist.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(categorylist.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    			if (detaching) detach_dev(t2);
    			destroy_component(categorylist, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(69:2) {#each categories as category}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block, create_if_block_1, create_if_block_2, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*isSearching*/ ctx[2]) return 0;
    		if (/*isFeaturedList*/ ctx[0]) return 1;
    		if (/*activeCategoryData*/ ctx[4]) return 2;
    		return 3;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let filteredItemsByKeyword;
    	let isSearching;
    	let activeCategoryData;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("MainContent", slots, []);
    	
    	let { items } = $$props;
    	let { isFeaturedList } = $$props;
    	let { activeCategory } = $$props;
    	let { categories } = $$props;
    	let searchValue;

    	searchKeyword.subscribe(value => {
    		$$invalidate(8, searchValue = value);
    	});

    	const featuredTemplates = items.filter(item => !!item.featuredOrder).sort((a, b) => Number(a.featuredOrder) - Number(b.featuredOrder));
    	const writable_props = ["items", "isFeaturedList", "activeCategory", "categories"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<MainContent> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("items" in $$props) $$invalidate(6, items = $$props.items);
    		if ("isFeaturedList" in $$props) $$invalidate(0, isFeaturedList = $$props.isFeaturedList);
    		if ("activeCategory" in $$props) $$invalidate(7, activeCategory = $$props.activeCategory);
    		if ("categories" in $$props) $$invalidate(1, categories = $$props.categories);
    	};

    	$$self.$capture_state = () => ({
    		items,
    		isFeaturedList,
    		activeCategory,
    		categories,
    		searchKeyword,
    		CategoryList,
    		searchValue,
    		featuredTemplates,
    		filteredItemsByKeyword,
    		isSearching,
    		activeCategoryData
    	});

    	$$self.$inject_state = $$props => {
    		if ("items" in $$props) $$invalidate(6, items = $$props.items);
    		if ("isFeaturedList" in $$props) $$invalidate(0, isFeaturedList = $$props.isFeaturedList);
    		if ("activeCategory" in $$props) $$invalidate(7, activeCategory = $$props.activeCategory);
    		if ("categories" in $$props) $$invalidate(1, categories = $$props.categories);
    		if ("searchValue" in $$props) $$invalidate(8, searchValue = $$props.searchValue);
    		if ("filteredItemsByKeyword" in $$props) $$invalidate(3, filteredItemsByKeyword = $$props.filteredItemsByKeyword);
    		if ("isSearching" in $$props) $$invalidate(2, isSearching = $$props.isSearching);
    		if ("activeCategoryData" in $$props) $$invalidate(4, activeCategoryData = $$props.activeCategoryData);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*items, searchValue*/ 320) {
    			$$invalidate(3, filteredItemsByKeyword = items.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()) || item.description.toLowerCase().includes(searchValue.toLowerCase())));
    		}

    		if ($$self.$$.dirty & /*searchValue*/ 256) {
    			$$invalidate(2, isSearching = searchValue.length > 0);
    		}

    		if ($$self.$$.dirty & /*activeCategory, categories*/ 130) {
    			$$invalidate(4, activeCategoryData = activeCategory
    			? categories.find(item => {
    					return item.slug === activeCategory;
    				})
    			: null);
    		}

    		if ($$self.$$.dirty & /*isSearching*/ 4) {
    			/**
     * hiding featured categories
     */
    			{
    				try {
    					const thisContentEl = document.getElementById("ss-content");

    					if (thisContentEl) {
    						const prevSibling = thisContentEl.previousElementSibling;

    						if (prevSibling && isSearching) {
    							prevSibling.style.display = "none";
    						} else if (prevSibling && !isSearching) {
    							prevSibling.style.display = "block";
    						}
    					}
    				} catch(_a) {
    					
    				}
    			}
    		}
    	};

    	return [
    		isFeaturedList,
    		categories,
    		isSearching,
    		filteredItemsByKeyword,
    		activeCategoryData,
    		featuredTemplates,
    		items,
    		activeCategory,
    		searchValue
    	];
    }

    class MainContent extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			items: 6,
    			isFeaturedList: 0,
    			activeCategory: 7,
    			categories: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MainContent",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*items*/ ctx[6] === undefined && !("items" in props)) {
    			console.warn("<MainContent> was created without expected prop 'items'");
    		}

    		if (/*isFeaturedList*/ ctx[0] === undefined && !("isFeaturedList" in props)) {
    			console.warn("<MainContent> was created without expected prop 'isFeaturedList'");
    		}

    		if (/*activeCategory*/ ctx[7] === undefined && !("activeCategory" in props)) {
    			console.warn("<MainContent> was created without expected prop 'activeCategory'");
    		}

    		if (/*categories*/ ctx[1] === undefined && !("categories" in props)) {
    			console.warn("<MainContent> was created without expected prop 'categories'");
    		}
    	}

    	get items() {
    		throw new Error("<MainContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<MainContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isFeaturedList() {
    		throw new Error("<MainContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isFeaturedList(value) {
    		throw new Error("<MainContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get activeCategory() {
    		throw new Error("<MainContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set activeCategory(value) {
    		throw new Error("<MainContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get categories() {
    		throw new Error("<MainContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set categories(value) {
    		throw new Error("<MainContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const templates = Array.from(document.getElementsByClassName('embed_collection_item')).map((item) => {
        const arrayOfProperties = Array.from(item.children)
            .map((child) => {
            const id = child.getAttribute('data-property');
            return id ? id.split(/:(.+)/) : null;
        })
            .filter((item) => !!item);
        const nextSibling = item.nextElementSibling;
        let secondaryCategories = [];
        if (nextSibling) {
            const categories = Array.from(nextSibling.querySelectorAll('em')).map((item) => ({
                slug: item.getAttribute('data-slug'),
                name: item.getAttribute('data-name'),
            }));
            secondaryCategories = categories;
        }
        const result = arrayOfProperties.reduce((res, next) => {
            return Object.assign(Object.assign({}, res), { [next[0]]: next[1] });
        }, { secondaryCategories });
        return result;
    });
    const categories = Object.entries(templates.reduce((res, next) => {
        const secondary = next.secondaryCategories.reduce((r, cat) => {
            return Object.assign(Object.assign({}, r), { [cat.slug]: cat.name });
        }, {});
        return Object.assign(Object.assign(Object.assign({}, res), { [next.primarySlug]: next.primaryCategory }), secondary);
    }, {}))
        .filter((item) => !!item)
        .map(([key, value]) => ({
        slug: key,
        name: value,
    }))
        .sort((a, b) => {
        return (a.name || '').localeCompare(b.name || '');
    })
        // add all templates as data
        .map((category) => {
        // category items
        const data = templates
            .filter((template) => {
            if (template.primarySlug === category.slug) {
                return true;
            }
            // has this category as a secondary category
            if (template.secondaryCategories.find((cat) => cat.slug === category.slug)) {
                return true;
            }
            return false;
        })
            .sort((a, b) => {
            const aOrder = a.primaryCategory === category.name
                ? Number(a.categoryOrder)
                : Number(a.categoryOrder) + 10000;
            const bOrder = b.primaryCategory === category.name
                ? Number(b.categoryOrder)
                : Number(b.categoryOrder) + 10000;
            return aOrder - bOrder;
        });
        return Object.assign(Object.assign({}, category), { data });
    });

    /* src/Sidebar/SidebarSearch.svelte generated by Svelte v3.38.2 */
    const file$1 = "src/Sidebar/SidebarSearch.svelte";

    function create_fragment$1(ctx) {
    	let div1;
    	let div0;
    	let input;
    	let t;
    	let span;
    	let img;
    	let img_src_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			input = element("input");
    			t = space();
    			span = element("span");
    			img = element("img");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", "sidebar__input w-input");
    			attr_dev(input, "maxlength", "256");
    			attr_dev(input, "placeholder", "Search");
    			add_location(input, file$1, 9, 4, 228);
    			if (img.src !== (img_src_value = "https://assets.website-files.com/60188e265d13c5a7c8f7998b/6037ba867f12403823977c18_search-icon.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "loading", "lazy");
    			attr_dev(img, "alt", "");
    			add_location(img, file$1, 19, 7, 494);
    			attr_dev(span, "class", "sidebar__submit w-inline-block");
    			add_location(span, file$1, 18, 4, 442);
    			attr_dev(div0, "class", "sidebar__form-wrap");
    			add_location(div0, file$1, 8, 2, 191);
    			attr_dev(div1, "class", "sidebar__form w-form");
    			add_location(div1, file$1, 7, 0, 154);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, input);
    			append_dev(div0, t);
    			append_dev(div0, span);
    			append_dev(span, img);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_handler*/ ctx[0], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("SidebarSearch", slots, []);
    	let searchValue;

    	searchKeyword.subscribe(value => {
    		searchValue = value;
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SidebarSearch> was created with unknown prop '${key}'`);
    	});

    	const input_handler = event => {
    		searchKeyword.set(event.currentTarget.value);
    	};

    	$$self.$capture_state = () => ({ searchKeyword, searchValue });

    	$$self.$inject_state = $$props => {
    		if ("searchValue" in $$props) searchValue = $$props.searchValue;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [input_handler];
    }

    class SidebarSearch extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SidebarSearch",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/Sidebar/SidebarCategories.svelte generated by Svelte v3.38.2 */

    const file = "src/Sidebar/SidebarCategories.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (7:4) {#each categories as category}
    function create_each_block(ctx) {
    	let div;
    	let a;
    	let t0_value = /*category*/ ctx[1].name + "";
    	let t0;
    	let a_href_value;
    	let t1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			a = element("a");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(a, "href", a_href_value = `/category/${/*category*/ ctx[1].slug}`);
    			attr_dev(a, "class", "link-small category-dropdown-link");
    			add_location(a, file, 8, 8, 243);
    			attr_dev(div, "role", "listitem");
    			attr_dev(div, "class", "sidebar__item w-dyn-item");
    			add_location(div, file, 7, 6, 180);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, a);
    			append_dev(a, t0);
    			append_dev(div, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*categories*/ 1 && t0_value !== (t0_value = /*category*/ ctx[1].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*categories*/ 1 && a_href_value !== (a_href_value = `/category/${/*category*/ ctx[1].slug}`)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(7:4) {#each categories as category}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let div1;
    	let div0;
    	let each_value = /*categories*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "role", "list");
    			attr_dev(div0, "class", "w-dyn-items");
    			add_location(div0, file, 5, 2, 101);
    			attr_dev(div1, "class", "sidebar__categories w-dyn-list");
    			add_location(div1, file, 4, 0, 54);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*categories*/ 1) {
    				each_value = /*categories*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("SidebarCategories", slots, []);
    	
    	let { categories } = $$props;
    	const writable_props = ["categories"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SidebarCategories> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("categories" in $$props) $$invalidate(0, categories = $$props.categories);
    	};

    	$$self.$capture_state = () => ({ categories });

    	$$self.$inject_state = $$props => {
    		if ("categories" in $$props) $$invalidate(0, categories = $$props.categories);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [categories];
    }

    class SidebarCategories extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { categories: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SidebarCategories",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*categories*/ ctx[0] === undefined && !("categories" in props)) {
    			console.warn("<SidebarCategories> was created without expected prop 'categories'");
    		}
    	}

    	get categories() {
    		throw new Error("<SidebarCategories>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set categories(value) {
    		throw new Error("<SidebarCategories>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const getActiveCategoryFromUrl = () => {
        const pathname = window.location.pathname;
        if (pathname.startsWith('/category/')) {
            return pathname.replace('/category/', '').split('/')[0];
        }
        return null;
    };
    const getIsFeaturedList = () => {
        const pathname = window.location.pathname;
        return pathname === '/templates-featured';
    };
    // on page load, this gets populated
    const activeCategory = getActiveCategoryFromUrl();
    const isFeaturedList = getIsFeaturedList();
    const content = document.getElementById('ss-content');
    if (content) {
        var app = new MainContent({
            target: document.getElementById('ss-content'),
            props: {
                items: templates,
                activeCategory,
                isFeaturedList,
                categories,
            },
        });
    }
    /**
     * Initialize searchbar
     */
    const searchEl = document.getElementById('ss-search');
    if (searchEl) {
        new SidebarSearch({
            target: searchEl,
        });
    }
    /**
     * initialize category list
     */
    const categoriesTargetEl = document.getElementById('ss-category-list');
    if (categoriesTargetEl) {
        new SidebarCategories({
            target: categoriesTargetEl,
            props: {
                categories,
            },
        });
    }
    /**
     * initialize mobile category list
     */
    const categoriesMobileTargetEl = document.getElementById('ss-category-list-mobile');
    if (categoriesTargetEl) {
        new SidebarCategories({
            target: categoriesMobileTargetEl,
            props: {
                categories,
            },
        });
    }

    return app;

}());
//# sourceMappingURL=bundle.js.map
