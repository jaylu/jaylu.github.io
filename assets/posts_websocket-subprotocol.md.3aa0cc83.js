import{_ as s,o as n,c as a,Q as o}from"./chunks/framework.fec3dccb.js";const h=JSON.parse('{"title":"Websocket Subprotocol","description":"explain what is websocket subprotocol and given an working example with mu-server and jdk-http-client","frontmatter":{"date":"2023-01-07T00:00:00.000Z","title":"Websocket Subprotocol","tags":["Java","JDK Http Client","Websocket"],"description":"explain what is websocket subprotocol and given an working example with mu-server and jdk-http-client"},"headers":[],"relativePath":"posts/websocket-subprotocol.md","filePath":"posts/websocket-subprotocol.md"}'),l={name:"posts/websocket-subprotocol.md"},e=o(`<h1 id="websocket-subprotocol" tabindex="-1">Websocket Subprotocol <a class="header-anchor" href="#websocket-subprotocol" aria-label="Permalink to &quot;Websocket Subprotocol&quot;">​</a></h1><h2 id="what-is-websocket-subprotocol" tabindex="-1">What is Websocket Subprotocol <a class="header-anchor" href="#what-is-websocket-subprotocol" aria-label="Permalink to &quot;What is Websocket Subprotocol&quot;">​</a></h2><p>You may take a look at the <a href="https://www.rfc-editor.org/rfc/rfc6455#page-12" target="_blank" rel="noreferrer">RFC</a> or <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#subprotocols" target="_blank" rel="noreferrer">MDN</a> to get a quick understanding what it is.</p><p>In general, websocket is a bi-directional, two way communication protocol. It has the server side and client side. The message being transferred could be in text, binary format.</p><p>In practice, we will define our own protocol on top of websocket. Take an example if we want to define a chat protocol. The message transferred in the websocket could be something like:</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki dracula"><code><span class="line"><span style="color:#F8F8F2;">{</span></span>
<span class="line"><span style="color:#F8F8F2;">    &quot;messageType&quot; : &quot;userJoin&quot; </span></span>
<span class="line"><span style="color:#F8F8F2;">    &quot;payload&quot; : {</span></span>
<span class="line"><span style="color:#F8F8F2;">        &quot;userId&quot;: &quot;1234&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">{</span></span>
<span class="line"><span style="color:#F8F8F2;">    &quot;messageType&quot; : &quot;userLeave&quot; </span></span>
<span class="line"><span style="color:#F8F8F2;">    &quot;payload&quot; : {</span></span>
<span class="line"><span style="color:#F8F8F2;">        &quot;userId&quot;: &quot;1234&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">{</span></span>
<span class="line"><span style="color:#F8F8F2;">    &quot;messageType&quot; : &quot;userChat&quot; </span></span>
<span class="line"><span style="color:#F8F8F2;">    &quot;payload&quot; : {</span></span>
<span class="line"><span style="color:#F8F8F2;">        &quot;from&quot;: &quot;1234&quot;,</span></span>
<span class="line"><span style="color:#F8F8F2;">        &quot;to&quot;: &quot;2345&quot;,</span></span>
<span class="line"><span style="color:#F8F8F2;">        &quot;message&quot;: &quot;hello&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">...</span></span></code></pre></div><p>Or if we want to make it high performance, we can even define binary protocol, e.g.</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki dracula"><code><span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">|messageType | payload |</span></span>
<span class="line"><span style="color:#F8F8F2;">|------------|---------|</span></span>
<span class="line"><span style="color:#F8F8F2;">| 4 byte     | n bytes.|</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">messageType can be</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">    * userJoin, value=1 </span></span>
<span class="line"><span style="color:#F8F8F2;">    * userLeft, value=2</span></span>
<span class="line"><span style="color:#F8F8F2;">    * userChat, value=3</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">for example: </span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">// userJoin</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"> 1            1234</span></span>
<span class="line"><span style="color:#F8F8F2;">|------------|---------|</span></span>
<span class="line"><span style="color:#F8F8F2;">| messageType| userId  |</span></span>
<span class="line"><span style="color:#F8F8F2;">| 4 byte     | 4 bytes.|</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">// userLeft</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"> 2            1234</span></span>
<span class="line"><span style="color:#F8F8F2;">|------------|---------|</span></span>
<span class="line"><span style="color:#F8F8F2;">| messageType| userId  |</span></span>
<span class="line"><span style="color:#F8F8F2;">| 4 byte     | 4 bytes.|</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">// chat</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"> 2            1234        2345        hello</span></span>
<span class="line"><span style="color:#F8F8F2;">|------------|-----------|-----------|-----------|</span></span>
<span class="line"><span style="color:#F8F8F2;">| messageType| fromUserId| toUserId  | message   |</span></span>
<span class="line"><span style="color:#F8F8F2;">| 4 byte     | 4 bytes   | 4 bytes   | n bytes   |</span></span></code></pre></div><p>Say if our server support both text and binary protocol, our client can then do a negotiation to select one of them.</p><p>In theory, client can add custom header in the http websocket upgrade request, and server respond back the negotiated protocol in custom header. But Websocket not allow adding extra header in response.</p><p>However, it defined something call <code>subprotocol</code>, a dedicated header for protocol negotiation <code>Sec-WebSocket-Protocol</code>.</p><h2 id="message-flow" tabindex="-1">Message Flow <a class="header-anchor" href="#message-flow" aria-label="Permalink to &quot;Message Flow&quot;">​</a></h2><p>As the example below</p><ul><li>client send preferred protocol: <code>Sec-WebSocket-Protocol: chat_text_v1, chat_binary_v1</code></li><li>server response protocol it can support: <code>Sec-WebSocket-Protocol: chat_text_v1</code></li></ul><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki dracula"><code><span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">// client sending the websocket upgrade request</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">GET /chat HTTP/1.1</span></span>
<span class="line"><span style="color:#F8F8F2;">Host: chat.com</span></span>
<span class="line"><span style="color:#F8F8F2;">Upgrade: websocket</span></span>
<span class="line"><span style="color:#F8F8F2;">Connection: Upgrade</span></span>
<span class="line"><span style="color:#F8F8F2;">Sec-WebSocket-Protocol: chat_text_v1, chat_binary_v1</span></span>
<span class="line"><span style="color:#F8F8F2;">...</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">// server response websocket upgrade and also the subprotocol</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">HTTP/1.1 101 Switching Protocols</span></span>
<span class="line"><span style="color:#F8F8F2;">Upgrade: websocket</span></span>
<span class="line"><span style="color:#F8F8F2;">Connection: Upgrade</span></span>
<span class="line"><span style="color:#F8F8F2;">Sec-WebSocket-Protocol: chat_text_v1</span></span>
<span class="line"><span style="color:#F8F8F2;">...</span></span></code></pre></div><p>There are something need to pay attention:</p><ol><li>server can only respond protocol in client&#39;s preferred list</li><li>adding version in your protocol could make the upgrade easier in the future. (Also possible to make things non-breaking during upgrade)</li></ol><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><p>Here is an example of Websocket Subprotocol implementation with <a href="https://muserver.io/" target="_blank" rel="noreferrer">mu-server</a> and jdk-http-client</p><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki dracula has-highlighted-lines"><code><span class="line"><span style="color:#F8F8F2;">@</span><span style="color:#8BE9FD;font-style:italic;">Test</span></span>
<span class="line"><span style="color:#8BE9FD;font-style:italic;">void</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">testWebsocketSubProtocol</span><span style="color:#F8F8F2;">() throws InterruptedException {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#8BE9FD;font-style:italic;">CountDownLatch</span><span style="color:#F8F8F2;"> latch </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;font-weight:bold;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">CountDownLatch</span><span style="color:#F8F8F2;">(</span><span style="color:#BD93F9;">1</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#8BE9FD;font-style:italic;">MuServer</span><span style="color:#F8F8F2;"> server </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> MuServerBuilder.</span><span style="color:#50FA7B;">httpsServer</span><span style="color:#F8F8F2;">()</span></span>
<span class="line"><span style="color:#F8F8F2;">        .</span><span style="color:#50FA7B;">addHandler</span><span style="color:#F8F8F2;">(</span></span>
<span class="line"><span style="color:#F8F8F2;">            WebSocketHandlerBuilder.</span><span style="color:#50FA7B;">webSocketHandler</span><span style="color:#F8F8F2;">()</span></span>
<span class="line"><span style="color:#F8F8F2;">                .</span><span style="color:#50FA7B;">withPath</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">/echo-socket</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">)</span></span>
<span class="line"><span style="color:#F8F8F2;">                .</span><span style="color:#50FA7B;">withWebSocketFactory</span><span style="color:#F8F8F2;">((request, responseHeaders) </span><span style="color:#8BE9FD;font-style:italic;">-&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#F8F8F2;">                    </span><span style="color:#6272A4;">// 2. server received preferred sub protocols from client requests</span></span>
<span class="line highlighted"><span style="color:#F8F8F2;">                    </span><span style="color:#8BE9FD;font-style:italic;">String</span><span style="color:#F8F8F2;"> clientRequestProtocol </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> request.</span><span style="color:#50FA7B;">headers</span><span style="color:#F8F8F2;">()</span></span>
<span class="line highlighted"><span style="color:#F8F8F2;">                        .</span><span style="color:#50FA7B;">get</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">Sec-WebSocket-Protocol</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">                    </span><span style="color:#8BE9FD;font-style:italic;">String</span><span style="color:#F8F8F2;">[] protocols;</span></span>
<span class="line"><span style="color:#F8F8F2;">                    </span><span style="color:#FF79C6;">if</span><span style="color:#F8F8F2;"> (clientRequestProtocol </span><span style="color:#FF79C6;">!=</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">null</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">&amp;&amp;</span></span>
<span class="line"><span style="color:#F8F8F2;">                        (protocols </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> clientRequestProtocol.</span><span style="color:#50FA7B;">split</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">,</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">)).length </span><span style="color:#FF79C6;">&gt;</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">0</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line highlighted"><span style="color:#F8F8F2;">                        </span><span style="color:#6272A4;">// 3. server respond back sub protocol it can support</span></span>
<span class="line highlighted"><span style="color:#F8F8F2;">                        responseHeaders.</span><span style="color:#50FA7B;">set</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">Sec-WebSocket-Protocol</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">, protocols[</span><span style="color:#BD93F9;">0</span><span style="color:#F8F8F2;">].</span><span style="color:#50FA7B;">trim</span><span style="color:#F8F8F2;">());</span></span>
<span class="line"><span style="color:#F8F8F2;">                    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">                    </span><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;font-weight:bold;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">BaseWebSocket</span><span style="color:#F8F8F2;">() {</span></span>
<span class="line"><span style="color:#F8F8F2;">                        </span><span style="color:#FF79C6;">public</span><span style="color:#50FA7B;"> </span><span style="color:#8BE9FD;font-style:italic;">void</span><span style="color:#50FA7B;"> onClientClosed(</span><span style="color:#8BE9FD;font-style:italic;">int</span><span style="color:#50FA7B;"> </span><span style="color:#FFB86C;font-style:italic;">statusCode</span><span style="color:#50FA7B;">, </span><span style="color:#8BE9FD;font-style:italic;">String</span><span style="color:#50FA7B;"> </span><span style="color:#FFB86C;font-style:italic;">reason</span><span style="color:#50FA7B;">) </span><span style="color:#FF79C6;">throws</span><span style="color:#50FA7B;"> </span><span style="color:#8BE9FD;font-style:italic;">Exception</span><span style="color:#50FA7B;"> {</span></span>
<span class="line"><span style="color:#50FA7B;">                            </span><span style="color:#BD93F9;font-style:italic;">super</span><span style="color:#50FA7B;">.onClientClosed(statusCode, reason);</span></span>
<span class="line"><span style="color:#50FA7B;">                            </span><span style="color:#F8F8F2;">latch</span><span style="color:#50FA7B;">.countDown();</span></span>
<span class="line"><span style="color:#50FA7B;">                        }</span></span>
<span class="line"><span style="color:#F8F8F2;">                    };</span></span>
<span class="line"><span style="color:#F8F8F2;">                })</span></span>
<span class="line"><span style="color:#F8F8F2;">        )</span></span>
<span class="line"><span style="color:#F8F8F2;">        .</span><span style="color:#50FA7B;">start</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#FF79C6;">final</span><span style="color:#F8F8F2;"> </span><span style="color:#8BE9FD;font-style:italic;">String</span><span style="color:#F8F8F2;">[] subProtocolFromServer </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;font-weight:bold;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#8BE9FD;font-style:italic;">String</span><span style="color:#F8F8F2;">[</span><span style="color:#BD93F9;">1</span><span style="color:#F8F8F2;">];</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#8BE9FD;font-style:italic;">WebSocket</span><span style="color:#F8F8F2;">.</span><span style="color:#8BE9FD;font-style:italic;">Listener</span><span style="color:#F8F8F2;"> listener </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;font-weight:bold;">new</span><span style="color:#F8F8F2;"> WebSocket.</span><span style="color:#50FA7B;">Listener</span><span style="color:#F8F8F2;">() {</span></span>
<span class="line"><span style="color:#F8F8F2;">        @</span><span style="color:#8BE9FD;font-style:italic;">Override</span></span>
<span class="line"><span style="color:#F8F8F2;">        </span><span style="color:#FF79C6;">public</span><span style="color:#F8F8F2;"> </span><span style="color:#8BE9FD;font-style:italic;">void</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">onOpen</span><span style="color:#F8F8F2;">(</span><span style="color:#8BE9FD;font-style:italic;">WebSocket</span><span style="color:#F8F8F2;"> webSocket) {</span></span>
<span class="line highlighted"><span style="color:#F8F8F2;">            </span><span style="color:#6272A4;">// 4 client receive the supported sub protocol from server</span></span>
<span class="line highlighted"><span style="color:#F8F8F2;">            subProtocolFromServer[</span><span style="color:#BD93F9;">0</span><span style="color:#F8F8F2;">] </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> webSocket.</span><span style="color:#50FA7B;">getSubprotocol</span><span style="color:#F8F8F2;">();</span></span>
<span class="line highlighted"><span style="color:#F8F8F2;">            webSocket.</span><span style="color:#50FA7B;">sendClose</span><span style="color:#F8F8F2;">(</span><span style="color:#BD93F9;">1000</span><span style="color:#F8F8F2;">, </span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">normal close</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">        }</span></span>
<span class="line"><span style="color:#F8F8F2;">    };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#8BE9FD;font-style:italic;">URI</span><span style="color:#F8F8F2;"> uri </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> URI.</span><span style="color:#50FA7B;">create</span><span style="color:#F8F8F2;">(server.</span><span style="color:#50FA7B;">uri</span><span style="color:#F8F8F2;">().</span><span style="color:#50FA7B;">toString</span><span style="color:#F8F8F2;">().</span><span style="color:#50FA7B;">replace</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">http</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">, </span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">ws</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">))</span></span>
<span class="line"><span style="color:#F8F8F2;">            .</span><span style="color:#50FA7B;">resolve</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">/echo-socket</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">    client.</span><span style="color:#50FA7B;">newWebSocketBuilder</span><span style="color:#F8F8F2;">()</span></span>
<span class="line highlighted"><span style="color:#F8F8F2;">            </span><span style="color:#6272A4;">// 1. client sending preferred sub protocols</span></span>
<span class="line highlighted"><span style="color:#F8F8F2;">            .</span><span style="color:#50FA7B;">subprotocols</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">chat_text_v1</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">, </span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">chat_binary_v1</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">)</span></span>
<span class="line"><span style="color:#F8F8F2;">            .</span><span style="color:#50FA7B;">connectTimeout</span><span style="color:#F8F8F2;">(Duration.</span><span style="color:#50FA7B;">ofMillis</span><span style="color:#F8F8F2;">(</span><span style="color:#BD93F9;">5000</span><span style="color:#F8F8F2;">))</span></span>
<span class="line"><span style="color:#F8F8F2;">            .</span><span style="color:#50FA7B;">buildAsync</span><span style="color:#F8F8F2;">(uri, listener);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">    latch.</span><span style="color:#50FA7B;">await</span><span style="color:#F8F8F2;">(</span><span style="color:#BD93F9;">1</span><span style="color:#F8F8F2;">, TimeUnit.MINUTES);</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#50FA7B;">assertThat</span><span style="color:#F8F8F2;">(subProtocolFromServer[</span><span style="color:#BD93F9;">0</span><span style="color:#F8F8F2;">]).</span><span style="color:#50FA7B;">isEqualTo</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">chat_text_v1</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span></code></pre></div><h2 id="summary" tabindex="-1">Summary <a class="header-anchor" href="#summary" aria-label="Permalink to &quot;Summary&quot;">​</a></h2><p>We simply covered:</p><ul><li>What is websocket subprotocol</li><li>What the message flow looks like</li><li>An example of using websocket subprotocol</li></ul><p>Hope this helps and feel free to take a look my other articles.</p><h2 id="reference" tabindex="-1">Reference <a class="header-anchor" href="#reference" aria-label="Permalink to &quot;Reference&quot;">​</a></h2><ul><li><a href="https://www.rfc-editor.org/rfc/rfc6455#page-12" target="_blank" rel="noreferrer">https://www.rfc-editor.org/rfc/rfc6455#page-12</a></li><li><a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#subprotocols" target="_blank" rel="noreferrer">https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#subprotocols</a></li><li><a href="https://medium.com/@lancers/websocket-api-sec-websocket-protocol-subprotocol-header-support-277e34164537" target="_blank" rel="noreferrer">https://medium.com/@lancers/websocket-api-sec-websocket-protocol-subprotocol-header-support-277e34164537</a></li><li><a href="https://stackoverflow.com/questions/67436517/what-is-a-websocket-subprotocol" target="_blank" rel="noreferrer">https://stackoverflow.com/questions/67436517/what-is-a-websocket-subprotocol</a></li></ul>`,26),p=[e];function t(c,F,r,i,y,u){return n(),a("div",null,p)}const b=s(l,[["render",t]]);export{h as __pageData,b as default};
