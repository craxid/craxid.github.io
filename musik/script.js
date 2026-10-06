  /* ===== MUSIK ===== */
  'use strict';
  var PIPED = [
    'https://api.piped.private.coffee',
    'https://pipedapi.adminforge.de',
    'https://api.piped.projectsegfau.lt',
    'https://pipedapi.reallyaweso.me'
  ];
  var body = document.body;
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  var _dta=document.createElement('textarea');
  function decodeHtml(s){ _dta.innerHTML=s||''; return _dta.value; }
  function isoDur(s){ var m=/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(s||''); if(!m) return 0;
    return (parseInt(m[1]||'0',10)*3600)+(parseInt(m[2]||'0',10)*60)+parseInt(m[3]||'0',10); }
  function prettyCodec(c){ c=String(c||'').toLowerCase();
    if(c.indexOf('mp4a')===0||c.indexOf('aac')>=0) return 'AAC';
    if(c.indexOf('opus')>=0) return 'Opus';
    if(c.indexOf('vorbis')>=0) return 'Vorbis';
    if(c.indexOf('flac')>=0) return 'FLAC';
    if(c==='mp3'||c.indexOf('mp3')>=0) return 'MP3';
    if(c.indexOf('wav')>=0||c.indexOf('pcm')>=0) return 'WAV';
    if(c.indexOf('ec-3')>=0||c.indexOf('ac-3')>=0) return 'Dolby';
    return c?c.toUpperCase():''; }
  function fmtKhz(hz){ hz=parseFloat(hz)||0; if(hz<=0) return '';
    return (hz>=1000 ? String(hz/1000).replace(/\.0$/,'') : String(hz))+' kHz'; }
  function fmtT(sec){ sec=Math.max(0,Math.floor(sec||0)); var m=Math.floor(sec/60), s=sec%60; return m+':'+(s<10?'0':'')+s; }
  function thumb(id){ return 'https://i.ytimg.com/vi/'+id+'/mqdefault.jpg'; }
  function thumbBig(id){ return 'https://i.ytimg.com/vi/'+id+'/hqdefault.jpg'; }
  function thumbMax(id){ return 'https://i.ytimg.com/vi/'+id+'/maxresdefault.jpg'; } /* 1280x720; gak semua video ada yg ini, ntar fallback sendiri */
  function setImgHD(img, id){
    img.onerror=function(){ this.onerror=null; this.src=thumbBig(id); };
    img.src=thumbMax(id);
  }
  function store(k, v){ try{ if(v===undefined) return JSON.parse(localStorage.getItem(k)); localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }

  /* ----- state ----- */
  var results = [];
  var queue = [], qi = -1;
  var player = null, playerReady = false, pendingTrack = null, progressTimer = null;
  var likes = store('cxmusik_likes') || [];
  var dislikes = store('cxmusik_dislikes') || [];
  var playlists = store('cxmusik_playlists') || {};
  var hist = store('cxmusik_history') || [];
  var activePl = null, pickerFor = -1;

  var $ = function(id){ return document.getElementById(id); };
  var resultsEl=$('results'), historyEl=$('historyList'), likedEl=$('likedList'),
      plChipsEl=$('plChips'), plTracksEl=$('plTracks'),
      bar=$('playerBar'), qList=$('fpQueueList');

  /* ----- tema ----- */
  var themeToggle = $('themeToggle');
  themeToggle.classList.add('liquid-glass');
  if (localStorage.getItem('theme') === 'dark') { body.classList.add('dark'); themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>'; }
  else { themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>'; }
  themeToggle.addEventListener('click', function(){
    body.classList.toggle('dark');
    var d = body.classList.contains('dark');
    localStorage.setItem('theme', d ? 'dark' : 'light');
    themeToggle.innerHTML = d ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  });
  $('year').textContent = new Date().getFullYear();
  $('footerName').textContent = 'CraXID Project';

  /* ----- percikan ----- */
  (function(){
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var layer = document.createElement('div'); layer.className='spark-layer'; layer.setAttribute('aria-hidden','true');
    document.body.appendChild(layer); var last=0;
    document.addEventListener('pointerdown', function(e){
      if (e.button!==undefined && e.button!==0) return;
      var now=performance.now(); if(now-last<90) return; last=now;
      for(var i=0;i<12;i++){ var s=document.createElement('span'); s.className='spark';
        var a=(Math.PI*2*i)/12+Math.random()*0.6, d2=36+Math.random()*46, sz=4+Math.random()*5;
        s.style.left=e.clientX+'px'; s.style.top=e.clientY+'px'; s.style.width=sz+'px'; s.style.height=sz+'px';
        s.style.marginLeft=-sz/2+'px'; s.style.marginTop=-sz/2+'px';
        s.style.setProperty('--dx', Math.cos(a)*d2+'px'); s.style.setProperty('--dy', Math.sin(a)*d2+'px');
        s.addEventListener('animationend', function(){ this.remove(); }); layer.appendChild(s); }
    });
  })();

  /* ----- pencarian ----- */
  function vidOfPiped(item){ var m=/v=([A-Za-z0-9_-]{11})/.exec(item.url||''); return m?m[1]:null; }
  function searchPiped(q){
    var i=0;
    function attempt(){
      if(i>=PIPED.length) return Promise.reject(new Error('semua instance mati'));
      setSearchStatus('Menghubungi server '+(i+1)+'/'+PIPED.length+'…');
      var ctrl = ('AbortController' in window) ? new AbortController() : null;
      var timer = ctrl ? setTimeout(function(){ ctrl.abort(); }, 10000) : null;
      return fetch(PIPED[i]+'/search?q='+encodeURIComponent(q)+'&filter=videos', ctrl?{signal:ctrl.signal}:undefined)
        .then(function(r){ if(timer) clearTimeout(timer); if(!r.ok) throw 0; return r.json(); })
        .then(function(d){
          var items=(d.items||[]).filter(function(it){ return it.type==='stream'; });
          if(!items.length) throw 0;
          try{ localStorage.setItem('cxmusik_piped', PIPED[i]); }catch(e){}
          setStatus('Pencarian: instance publik ('+PIPED[i].replace('https://','')+')');
          return items.map(function(it){
            var id=vidOfPiped(it);
            return { id:id, title:decodeHtml(it.title), author:decodeHtml(it.uploaderName||''), dur:it.duration||0, thumb:thumb(id) };
          }).filter(function(t){ return t.id; });
        })
        .catch(function(){ i++; return attempt(); });
    }
    var saved=null; try{ saved=localStorage.getItem('cxmusik_piped'); }catch(e){}
    if(saved && PIPED.indexOf(saved)>0){ PIPED.splice(PIPED.indexOf(saved),1); PIPED.unshift(saved); }
    return attempt();
  }
  function searchYT(q, key){
    return fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&q='+encodeURIComponent(q)+'&key='+encodeURIComponent(key))
      .then(function(r){ if(!r.ok) throw new Error('key salah / kuota habis'); return r.json(); })
      .then(function(d){
        setStatus('Pencarian: YouTube Data API (key sendiri)');
        var list=(d.items||[]).map(function(it){
          var id=it.id.videoId;
          return { id:id, title:decodeHtml(it.snippet.title), author:decodeHtml(it.snippet.channelTitle), dur:0, thumb:thumb(id) };
        });
        var ids=list.map(function(t){ return t.id; }).filter(Boolean);
        if(!ids.length) return list;
        /* search.list gak bawa durasi, comot lewat videos.list (makan 1 quota) */
        return fetch('https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id='+ids.join(',')+'&key='+encodeURIComponent(key))
          .then(function(r){ return r.ok?r.json():null; })
          .then(function(vd){
            if(vd&&vd.items){
              var dm={};
              vd.items.forEach(function(v){ if(v&&v.id&&v.contentDetails) dm[v.id]=isoDur(v.contentDetails.duration); });
              list.forEach(function(t){ if(dm[t.id]!=null) t.dur=dm[t.id]; });
            }
            return list;
          })
          .catch(function(){ return list; });
      });
  }
  function doSearch(){
    var q=$('q').value.trim();
    if(!q) return;
    setSearchStatus('Mencari…');
    resultsEl.innerHTML='<div class="loading-row"><i class="fa-solid fa-circle-notch fa-spin"></i> Mencari…</div>';
    var key=null; try{ key=localStorage.getItem('cxmusik_ytkey')||''; }catch(e){}
    var p = key ? searchYT(q,key).catch(function(){ return searchPiped(q); }) : searchPiped(q);
    p.then(function(list){
      setSearchStatus('');
      hideSearchNotif();
      results=list; pickerFor=-1; renderResults();
      if(!list.length) resultsEl.innerHTML='<div class="empty-note">Tidak ketemu. Coba kata kunci lain.</div>';
    }).catch(function(){
      setSearchStatus('');
      showSearchNotif();
      resultsEl.innerHTML='<div class="empty-note">Pencarian gagal — server publik sedang gangguan. Ketuk <b>Pengaturan</b> pada notifikasi di atas untuk memakai YouTube Data API key.</div>';
    });
  }
  $('searchBtn').addEventListener('click', doSearch);
  $('q').addEventListener('keydown', function(e){ if(e.key==='Enter') doSearch(); });

  /* ----- daftar hasil ----- */
  function trackRow(t, idx, ctx){
    var liked = likes.indexOf(t.id)>=0 ? ' liked' : '';
    return '<div class="track" data-idx="'+idx+'" data-ctx="'+ctx+'">'+
      '<img src="'+esc(t.thumb)+'" alt="" loading="lazy"/>'+
      '<div class="track-info"><div class="track-title">'+esc(t.title)+'</div>'+
      '<div class="track-sub">'+esc(t.author)+(t.dur?' • '+fmtT(t.dur):'')+'</div>'+
      '<div class="track-actions">'+
      '<button class="icon-btn" data-act="play" aria-label="Putar"><i class="fa-solid fa-play"></i></button>'+
      '<button class="icon-btn" data-act="queue" aria-label="Tambah antrean"><i class="fa-solid fa-list-ul"></i></button>'+
      '<button class="icon-btn'+liked+'" data-act="like" aria-label="Suka"><i class="fa-solid fa-heart"></i></button>'+
      '<button class="icon-btn" data-act="pl" aria-label="Playlist"><i class="fa-solid fa-plus"></i></button>'+
      '</div></div></div>'+
      (pickerFor===idx && ctx==='r' ? plPickerHtml() : '');
  }
  function plPickerHtml(){
    var names=Object.keys(playlists);
    var h='<div class="pl-picker">';
    names.forEach(function(n){ h+='<button class="pl-chip" data-plpick="'+esc(n)+'">'+esc(n)+'</button>'; });
    h+='<button class="pl-chip" data-plpick="__new">+ Baru</button></div>';
    return h;
  }
  function renderResults(){
    resultsEl.innerHTML = results.map(function(t,i){ return trackRow(t,i,'r'); }).join('') ||
      '<div class="empty-note">Cari lagu di kolom atas untuk mulai.</div>';
    marqueeTrackTitles(resultsEl);
  }
  /* judul kepanjangan dibikin jalan kyk di full player */
  function marqueeTrackTitles(root){
    (root||document).querySelectorAll('.track-title:not(.marquee)').forEach(function(el){
      setupMarquee(el, el.textContent);
    });
  }

  /* ----- library ----- */
  function saveLib(){ store('cxmusik_likes',likes); store('cxmusik_playlists',playlists); store('cxmusik_history',hist); store('cxmusik_dislikes',dislikes); }
  function findTrack(id){
    var all=results.concat(queue, hist, likes.map(function(){return null;}).filter(Boolean));
    for(var i=0;i<all.length;i++) if(all[i]&&all[i].id===id) return all[i];
    return null;
  }
  function likeTrack(t){
    var i=likes.indexOf(t.id);
    if(i>=0) likes.splice(i,1); else { likes.unshift(t.id); var d=dislikes.indexOf(t.id); if(d>=0) dislikes.splice(d,1); }
    saveLib(); renderResults(); renderLibrary();
  }
  function pushHistory(t){
    hist=hist.filter(function(h){ return h.id!==t.id; });
    hist.unshift({id:t.id,title:t.title,author:t.author,dur:t.dur,thumb:t.thumb});
    hist=hist.slice(0,30); saveLib();
  }
  function renderLibrary(){
    historyEl.innerHTML = hist.length ? hist.map(function(t,i){
      return '<div class="track"><img src="'+esc(t.thumb)+'" alt="" loading="lazy"/>'+
        '<div class="track-info"><div class="track-title">'+esc(t.title)+'</div>'+
        '<div class="track-sub">'+esc(t.author)+'</div>'+
        '<div class="track-actions"><button class="icon-btn" data-hplay="'+i+'" aria-label="Putar"><i class="fa-solid fa-play"></i></button></div></div></div>';
    }).join('') : '<div class="empty-note">Belum ada riwayat.</div>';
    likedEl.innerHTML = likes.length ? likes.map(function(id){
      var t=findTrack(id)||{id:id,title:id,author:'',dur:0,thumb:thumb(id)};
      return '<div class="track"><img src="'+esc(t.thumb)+'" alt="" loading="lazy"/>'+
        '<div class="track-info"><div class="track-title">'+esc(t.title)+'</div>'+
        '<div class="track-sub">'+esc(t.author)+'</div>'+
        '<div class="track-actions"><button class="icon-btn" data-lplay="'+esc(id)+'" aria-label="Putar"><i class="fa-solid fa-play"></i></button>'+
        '<button class="icon-btn liked" data-lunlike="'+esc(id)+'" aria-label="Hapus"><i class="fa-solid fa-heart"></i></button></div></div></div>';
    }).join('') : '<div class="empty-note">Ketuk ♥ di lagu untuk menyimpan di sini.</div>';
    var names=Object.keys(playlists);
    plChipsEl.innerHTML = names.map(function(n){
      return '<button class="pl-chip'+(activePl===n?' active':'')+'" data-pl="'+esc(n)+'">'+esc(n)+' ('+playlists[n].length+')</button>';
    }).join('') || '<span style="color:var(--muted);font-size:14px">Belum ada playlist.</span>';
    if(activePl && !playlists[activePl]) activePl=null;
    plTracksEl.innerHTML = activePl ? playlists[activePl].map(function(t,i){
      return '<div class="track"><img src="'+esc(t.thumb)+'" alt="" loading="lazy"/>'+
        '<div class="track-info"><div class="track-title">'+esc(t.title)+'</div>'+
        '<div class="track-sub">'+esc(t.author)+'</div>'+
        '<div class="track-actions"><button class="icon-btn" data-pplay="'+i+'" aria-label="Putar"><i class="fa-solid fa-play"></i></button>'+
        '<button class="icon-btn" data-prm="'+i+'" aria-label="Hapus"><i class="fa-solid fa-trash"></i></button></div></div></div>';
    }).join('') : '';
    marqueeTrackTitles(document.getElementById('tabLib'));
  }

  /* ----- player YouTube (disembunyiin) ----- */
  window.onYouTubeIframeAPIReady = function(){
    player = new YT.Player('ytplayer', {
      height:'2', width:'2',
      playerVars:{ autoplay:0, controls:0, disablekb:1, fs:0, rel:0, iv_load_policy:3 },
      events:{ onReady:function(){ playerReady=true; if(pendingTrack){ loadTrack(pendingTrack); pendingTrack=null; } },
               onStateChange:onState, onError:function(){ step(1); } }
    });
  };
  (function(){ var s=document.createElement('script'); s.src='https://www.youtube.com/iframe_api'; document.head.appendChild(s); })();

  function onState(e){
    var P=YT.PlayerState;
    if(e.data===P.PLAYING){ startProgress(); setPlayIcon(true); }
    else if(e.data===P.PAUSED){ stopProgress(); setPlayIcon(false); }
    else if(e.data===P.ENDED){ autoNext(); }
  }
  function setPlayIcon(playing){
    var ic = playing ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
    $('pbPlay').innerHTML = ic; $('fpPlay').innerHTML = ic;
    setMSPlaying(playing);
    isPlaying=playing;
    if(playing) acquireWake(); else releaseWake();
  }
  /* ----- Wake Lock: layar HP nggak mati sendiri selama musik bunyi.
     browser otomatis melepas lock pas tab disembunyiin, makanya diambil lagi tiap tab balik */
  var wakeSentinel=null, isPlaying=false;
  function wakeLockOn(){ try{ return localStorage.getItem('cxmusik_wakelock')==='1'; }catch(e){ return false; } }
  function setWakeLockStatus(s){ var el=$('wakeLockStatus'); if(el) el.textContent=s||''; }
  function renderWakeBtn(){ var b=$('wakeLockBtn'); if(b) b.textContent=wakeLockOn()?'Matikan':'Aktifkan'; }
  function acquireWake(){
    if(!wakeLockOn()||!isPlaying||!('wakeLock' in navigator)||wakeSentinel) return;
    try{
      navigator.wakeLock.request('screen').then(function(s){
        wakeSentinel=s;
        s.addEventListener('release', function(){ wakeSentinel=null; });
      }).catch(function(){ wakeSentinel=null; });
    }catch(e){ wakeSentinel=null; }
  }
  function releaseWake(){
    if(wakeSentinel){ try{ wakeSentinel.release(); }catch(e){} wakeSentinel=null; }
  }
  document.addEventListener('visibilitychange', function(){
    if(document.visibilityState==='visible') acquireWake(); else releaseWake();
  });
  var audioEl=$('audioEl'), useAudio=false, audioRefetching=false;
  function loadTrack(t){
    if(audioApiUrl()){ loadViaApi(t); return; }
    loadViaYT(t);
  }
  function loadViaYT(t){
    useAudio=false; audioMeta=null;
    try{ audioEl.pause(); }catch(e){}
    revokeBlob(); renderFpTech();
    if(!playerReady){ pendingTrack=t; return; }
    try{
      player.loadVideoById(t.id);
      player.setVolume(parseInt($('vol').value,10)||80);
    }catch(e){}
  }
  /* ambil link audio dari API, putar pake <audio> biar bisa background */
  var audioMeta=null;
  var blobCacheUrl=null;
  function revokeBlob(){ if(blobCacheUrl){ try{ URL.revokeObjectURL(blobCacheUrl); }catch(e){} blobCacheUrl=null; } }
  /* langsung streaming (bunyi ~2 detik), blob diunduh diam2 di background buat seek.
     server audionya ngabaikan range request, makanya seek butuh file utuh */
  var blobReady=false, blobPromise=null, blobTrackId=null;
  function startAudio(t, src, pos){
    try{
      audioEl.src=src;
      audioEl.volume=(parseInt($('vol').value,10)||80)/100;
      if(pos>0){ try{ audioEl.currentTime=pos; }catch(e){} }
      var pr=audioEl.play();
      if(pr&&pr.catch) pr.catch(function(){ setSearchStatus('Ketuk putar untuk mulai.'); });
    }catch(e){ loadViaYT(t); }
  }
  function startBlobFetch(t, meta){
    blobTrackId=t.id;
    var ctrl=('AbortController' in window)?new AbortController():null;
    var timer=ctrl?setTimeout(function(){ ctrl.abort(); }, 120000):null;
    blobPromise=fetch(meta.audioUrl, ctrl?{signal:ctrl.signal}:undefined)
      .then(function(r){ if(timer) clearTimeout(timer); if(!r.ok) throw 0; return r.blob(); })
      .then(function(blob){
        if(blobTrackId!==t.id) return null; /* lagu sudah ganti */
        revokeBlob();
        blobCacheUrl=URL.createObjectURL(blob);
        blobReady=true;
        return blobCacheUrl;
      })
      .catch(function(){ return null; });
    return blobPromise;
  }
  function ensureBlob(){
    if(blobReady&&blobCacheUrl) return Promise.resolve(blobCacheUrl);
    if(blobPromise) return blobPromise;
    var t=queue[qi];
    if(!t) return Promise.resolve(null);
    /* URL bisa kedaluwarsa, resolve ulang dulu sebelum unduh */
    return resolveAudio(t.id).then(function(meta){
      if(!meta||!meta.audioUrl) throw 0;
      audioMeta=meta;
      return startBlobFetch(t, meta);
    }).catch(function(){ return null; });
  }
  /* semua seek (progress bar & tombol ±3 dtk) lewat sini */
  function doSeek(pos){
    pos=Math.max(0,pos);
    var dur=audioEl.duration||0;
    if(dur>0&&isFinite(dur)) pos=Math.min(pos,dur);
    if(blobReady&&blobCacheUrl){
      try{
        if(audioEl.src!==blobCacheUrl) audioEl.src=blobCacheUrl;
        audioEl.currentTime=pos;
        if(audioEl.paused){ var pr=audioEl.play(); if(pr&&pr.catch) pr.catch(function(){}); }
      }catch(e){}
      return;
    }
    setSearchStatus('Mengunduh audio\u2026');
    ensureBlob().then(function(url){
      setSearchStatus('');
      if(!url) return;
      try{
        audioEl.src=url;
        audioEl.currentTime=pos;
        var pr2=audioEl.play(); if(pr2&&pr2.catch) pr2.catch(function(){});
      }catch(e){}
    });
  }
  function playBlob(t, meta, resumePos){
    setSearchStatus('');
    revokeBlob(); blobReady=false; blobPromise=null; blobTrackId=null;
    audioMeta=meta; renderFpTech();
    if(resumePos>0){
      /* refetch abis error: butuh posisi pas, tunggu blob dulu (jalur lama) */
      setSearchStatus('Mengunduh audio\u2026');
      startBlobFetch(t, meta).then(function(url){
        setSearchStatus('');
        if(!url){ loadViaYT(t); renderEngineBadge(); return; }
        startAudio(t, url, resumePos);
      });
      return;
    }
    /* jalur cepat: langsung streaming, blob nyusul di background */
    startAudio(t, meta.audioUrl, 0);
    startBlobFetch(t, meta);
  }
  /* pilih format audio paling enteng dari respons gaya resa (formats[]).
     prioritas m4a audio-only (kayak format 140); kalau nggak ada, yang penting ada url-nya */
  function pickResaAudio(d){
    var fs=(d&&d.formats)||[];
    var aud=fs.filter(function(f){ return f&&f.url&&/audio only/i.test(f.resolution||''); });
    var pool=aud.length?aud:fs.filter(function(f){ return f&&f.url; });
    pool.sort(function(a,b){
      var am=/m4a/i.test(a.ext||'')?0:1, bm=/m4a/i.test(b.ext||'')?0:1;
      if(am!==bm) return am-bm;
      return (a.filesize||1e15)-(b.filesize||1e15);
    });
    var f=pool[0];
    if(!f) return null;
    return { status:true, audioUrl:f.url,
             audioType:/m4a/i.test(f.ext||'')?'audio/mp4':'audio/mpeg',
             codec:f.ext, title:d.title||'', thumbnail:d.thumbnail||'' };
  }
  function fetchAudioMeta(videoId, timeoutMs, baseOverride){
    var api=(baseOverride||audioApiUrl());
    var ctrl=('AbortController' in window)?new AbortController():null;
    var timer=ctrl?setTimeout(function(){ ctrl.abort(); }, timeoutMs||25000):null;
    /* kirim dua-duanya: ?id= buat gaya Vercel, ?url= buat gaya resa. backend tinggal baca yang dia ngerti */
    var q='?id='+encodeURIComponent(videoId)+'&url='+encodeURIComponent('https://www.youtube.com/watch?v='+videoId);
    return fetch(api+q, ctrl?{signal:ctrl.signal}:undefined)
      .then(function(r){ if(timer) clearTimeout(timer); if(!r.ok) throw 0; return r.json(); })
      .then(function(d){
        if(d&&d.formats&&d.formats.length) return pickResaAudio(d); /* gaya resa */
        if(d&&d.status&&d.audioUrl) return d; /* gaya Vercel */
        throw 0;
      })
      .then(function(m){ if(!m||!m.audioUrl) throw 0; return m; });
  }
  /* cadangan: savenow.to — tembak langsung dari browser (CORS *), format mp3 */
  var SN_API_KEY='dfcb6d76f2f6a9894gjkege8a4ab232222';
  function fetchSnMeta(videoId){
    var initUrl='https://p.savenow.to/ajax/download.php?copyright=0&format=mp3&url='+
      encodeURIComponent('https://www.youtube.com/watch?v='+videoId)+
      '&api='+encodeURIComponent(SN_API_KEY);
    var ctrl=('AbortController' in window)?new AbortController():null;
    var timer=ctrl?setTimeout(function(){ ctrl.abort(); }, 20000):null;
    return fetch(initUrl, ctrl?{signal:ctrl.signal}:undefined)
      .then(function(r){ if(timer) clearTimeout(timer); if(!r.ok) throw 0; return r.json(); })
      .then(function(d){
        if(!d||!d.success||!d.progress_url) throw 0;
        var pid=String(d.progress_url).split('id=')[1];
        if(!pid) throw 0;
        var t0=Date.now();
        function once(){
          return fetch('https://p.savenow.to/api/progress?id='+encodeURIComponent(pid))
            .then(function(r){ if(!r.ok) throw 0; return r.json(); })
            .then(function(p){
              if(p&&p.success===1&&p.progress===1000&&p.download_url){
                return { status:true, audioUrl:p.download_url, audioType:'audio/mpeg',
                         codec:'mp3', title:p.title||'', thumbnail:p.thumbnail_url||'' };
              }
              if(Date.now()-t0>45000) throw 0;
              return new Promise(function(res){ setTimeout(res,2000); }).then(once);
            });
        }
        return once();
      });
  }
  /* urutan: API sendiri (Termux) -> savenow.to -> Vercel (paling akhir). mentok baru player YouTube */
  function resolveAudio(videoId){
    return fetchAudioMeta(videoId).catch(function(){
      setSearchStatus('Mencoba server cadangan\u2026');
      return fetchSnMeta(videoId);
    }).catch(function(){
      setSearchStatus('Mencoba server cadangan\u2026');
      return fetchAudioMeta(videoId, 25000, VERCEL_AUDIO_API);
    });
  }
  function renderFpTech(){
    var el=$('fpTech'); if(!el) return;
    if(useAudio&&audioMeta){
      var p=['API'];
      var c=prettyCodec(audioMeta.codec); if(c) p.push(c);
      var khz=fmtKhz(audioMeta.sampleRate); if(khz) p.push(khz);
      var br=parseFloat(audioMeta.bitrate)||0; if(br>0) p.push(Math.round(br)+' kbps');
      el.textContent=p.join(' \u2022 ');
    } else {
      el.textContent=useAudio?'API':'YouTube';
    }
  }
  function loadViaApi(t, resumePos){
    useAudio=true; audioRefetching=false; audioMeta=null; renderFpTech();
    setSearchStatus('Mengambil audio\u2026');
    resolveAudio(t.id).then(function(meta){
      playBlob(t, meta, resumePos);
    }).catch(function(){
      setSearchStatus('');
      loadViaYT(t); /* fallback: player YouTube (foreground saja) */
      renderEngineBadge();
    });
  }
  audioEl.addEventListener('play', function(){ startProgress(); setPlayIcon(true); });
  audioEl.addEventListener('pause', function(){ stopProgress(); setPlayIcon(false); });
  audioEl.addEventListener('ended', function(){ autoNext(); });
  audioEl.addEventListener('error', function(){
    if(!useAudio||audioRefetching) return;
    /* link bisa kedaluwarsa, ambil baru lanjut dari posisi terakhir */
    audioRefetching=true;
    var t=queue[qi], pos=0;
    try{ pos=audioEl.currentTime||0; }catch(e){}
    if(!t){ loadViaYT(t); return; }
    resolveAudio(t.id).then(function(meta){
      audioRefetching=false;
      playBlob(t, meta, pos);
    }).catch(function(){ audioRefetching=false; loadViaYT(t); });
  });
  function playAt(i){
    if(i<0||i>=queue.length) return;
    qi=i; var t=queue[qi];
    loadTrack(t); pushHistory(t); renderLibrary(); renderQueue(); showBar(t);
    if($('lyricsModal').classList.contains('show')) loadLyrics(t);
    if(autoplay&&queue.length-qi<=2) fetchRelated();
  }
  function playTrack(t){
    var i=queue.findIndex(function(x){ return x.id===t.id; });
    if(i<0){ queue.push(t); i=queue.length-1; }
    playAt(i);
  }
  /* ketuk putar di hasil pencarian: semua hasil masuk antrean (no duplikat),
     biar next/prev ada lagu buat diterusin. yg diketuk tetep diputar duluan */
  function playResults(idx){
    var t=results[idx]; if(!t||!t.id) return;
    var i=queue.findIndex(function(x){ return x.id===t.id; });
    if(i<0){
      var have={}; queue.forEach(function(x){ have[x.id]=1; });
      results.forEach(function(r){ if(r&&r.id&&!have[r.id]){ have[r.id]=1; queue.push(r); } });
      i=queue.findIndex(function(x){ return x.id===t.id; });
    }
    playAt(i);
  }
  function step(d){
    if(!queue.length) return;
    playAt((qi+d+queue.length)%queue.length);
  }
  /* ----- autoplay: antrean mau habis, comot lagu terkait dari Piped /streams ----- */
  var autoplay=true;
  try{ autoplay=localStorage.getItem('cxmusik_autoplay')!=='0'; }catch(e){}
  var fetchingRel=false;
  function fetchRelated(){
    if(fetchingRel) return Promise.resolve(false);
    var seed=queue[queue.length-1]||queue[qi];
    if(!seed||!seed.id) return Promise.resolve(false);
    fetchingRel=true;
    var order=PIPED.slice(), saved=null;
    try{ saved=localStorage.getItem('cxmusik_piped'); }catch(e){}
    if(saved&&order.indexOf(saved)>0){ order.splice(order.indexOf(saved),1); order.unshift(saved); }
    var i=0;
    function attempt(){
      if(i>=order.length){ fetchingRel=false; return Promise.resolve(false); }
      var ctrl=('AbortController' in window)?new AbortController():null;
      var timer=ctrl?setTimeout(function(){ ctrl.abort(); },8000):null;
      return fetch(order[i]+'/streams/'+seed.id, ctrl?{signal:ctrl.signal}:undefined)
        .then(function(r){ if(timer) clearTimeout(timer); if(!r.ok) throw 0; return r.json(); })
        .then(function(d){
          var have={}; queue.forEach(function(t){ have[t.id]=1; });
          var added=0;
          (d.relatedStreams||[]).forEach(function(v){
            if(added>=5||!v||v.type!=='stream'||!v.title) return;
            var m=/v=([A-Za-z0-9_-]{11})/.exec(v.url||'');
            var id=m?m[1]:null;
            if(!id||have[id]||id===seed.id||dislikes.indexOf(id)>=0) return;
            have[id]=1; added++;
            queue.push({id:id, title:decodeHtml(v.title), author:decodeHtml(v.uploaderName||'YouTube'), dur:(v.duration>0?v.duration:0), thumb:thumb(id)});
          });
          fetchingRel=false;
          if(added>0){ renderQueue(); return true; }
          throw 0;
        })
        .catch(function(){ i++; return attempt(); });
    }
    return attempt();
  }
  function autoNext(){
    if(qi+1<queue.length){ playAt(qi+1); return; }
    if(!autoplay){ playAt(0); return; }
    fetchRelated().then(function(ok){
      if(ok&&qi+1<queue.length) playAt(qi+1);
      else playAt(0);
    });
  }
  function renderApToggle(){
    var b=$('apToggle');
    b.textContent='Autoplay '+(autoplay?'ON':'OFF');
    b.classList.toggle('off',!autoplay);
  }
  function renderEngineBadge(){
    var b=$('engineBadge'); if(!b) return;
    b.textContent=useAudio?'API':'YT';
    b.classList.toggle('yt',!useAudio);
  }
  function showBar(t){
    renderEngineBadge();
    bar.classList.add('show');
    $('pbThumb').src=t.thumb; $('pbTitle').textContent=t.title; $('pbSub').textContent=t.author||'YouTube';
    $('tDur').textContent=t.dur?fmtT(t.dur):'--:--';
    setImgHD($('fpThumb'), t.id);
    (function(){
      var tid=t.id, bg=$('fpBg');
      var im=new Image();
      im.onload=function(){ if(queue[qi]&&queue[qi].id===tid) bg.style.backgroundImage="url('"+thumbMax(tid)+"')"; };
      im.onerror=function(){ if(queue[qi]&&queue[qi].id===tid) bg.style.backgroundImage="url('"+thumbBig(tid)+"')"; };
      im.src=thumbMax(tid);
    })();
    setupMarquee($('fpTitle'), t.title); $('fpSub').textContent=t.author||'YouTube';
    $('fpDur').textContent=t.dur?fmtT(t.dur):'--:--';
    renderFpLike(); renderFpTech(); updateMediaSession(t);
  }
  function setupMarquee(el, text){
    el.classList.remove('marquee');
    el.textContent=text;
    requestAnimationFrame(function(){
      if(el.scrollWidth>el.clientWidth+4){
        el.innerHTML='';
        for(var k=0;k<2;k++){
          var s=document.createElement('span');
          s.textContent=text+'\u00A0\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0\u00A0';
          s.style.animationDuration=Math.max(6,text.length*0.28)+'s';
          el.appendChild(s);
        }
        el.classList.add('marquee');
      }
    });
  }
  function renderFpLike(){
    var t=queue[qi]; if(!t) return;
    var liked=likes.indexOf(t.id)>=0, dis=dislikes.indexOf(t.id)>=0;
    var L=$('fpLike'), D=$('fpDislike');
    L.classList.toggle('liked',liked);
    L.querySelector('i').className=liked?'fa-solid fa-thumbs-up':'fa-regular fa-thumbs-up';
    D.classList.toggle('disliked',dis);
    D.querySelector('i').className=dis?'fa-solid fa-thumbs-down':'fa-regular fa-thumbs-down';
  }
  /* ----- Media Session: notif + kontrol lockscreen/background ----- */
  function setupMediaSession(){
    if(!('mediaSession' in navigator)) return;
    try{
      navigator.mediaSession.setActionHandler('play', function(){ togglePlay(); });
      navigator.mediaSession.setActionHandler('pause', function(){ togglePlay(); });
      navigator.mediaSession.setActionHandler('previoustrack', function(){ step(-1); });
      navigator.mediaSession.setActionHandler('nexttrack', function(){ step(1); });
    }catch(e){}
  }
  function updateMediaSession(t){
    if(!('mediaSession' in navigator)) return;
    try{
      navigator.mediaSession.metadata=new MediaMetadata({
        title:t.title||'Musik', artist:t.author||'YouTube', album:'CraXID Musik',
        artwork:[
          {src:thumbMax(t.id), sizes:'1280x720', type:'image/jpeg'},
          {src:thumbBig(t.id), sizes:'480x360', type:'image/jpeg'},
          {src:thumb(t.id), sizes:'320x180', type:'image/jpeg'}
        ]
      });
    }catch(e){}
  }
  function setMSPlaying(playing){
    if(!('mediaSession' in navigator)) return;
    try{ navigator.mediaSession.playbackState=playing?'playing':'paused'; }catch(e){}
  }
  function openFull(){ if(qi<0) return; $('fullPlayer').classList.add('show'); }
  function closeFull(){ $('fullPlayer').classList.remove('show'); }
  function renderQueue(){
    qList.innerHTML = queue.map(function(t,i){
      return '<div class="q-item'+(i===qi?' playing':'')+'" data-q="'+i+'"><img src="'+esc(t.thumb)+'" alt=""/>'+
        '<span>'+esc(t.title)+'</span>'+(i===qi?'<i class="fa-solid fa-volume-high"></i>':'')+'</div>';
    }).join('') || '<div class="empty-note">Antrean kosong.</div>';
  }
  function startProgress(){
    stopProgress();
    progressTimer=setInterval(function(){
      if(useAudio){
        if(!audioEl) return;
      } else if(!player||!playerReady) return;
      try{
        var cur, dur;
        if(useAudio){ cur=audioEl.currentTime||0; dur=audioEl.duration||0; }
        else { cur=player.getCurrentTime()||0; dur=player.getDuration()||0; }
        var meta=(queue[qi]&&queue[qi].dur)||0;
        if((!dur||dur<=0)&&meta>0) dur=meta;
        if(dur>0){
          var pct=Math.min(100,(cur/dur*100))+'%';
          $('pbFill').style.width=pct; $('fpFill').style.width=pct;
          $('tCur').textContent=fmtT(cur); $('tDur').textContent=fmtT(dur);
          $('fpCur').textContent=fmtT(cur); $('fpDur').textContent=fmtT(dur);
          syncLyrics(cur);
          try{
            if(useAudio&&'mediaSession' in navigator&&'setPositionState' in navigator.mediaSession&&isFinite(dur))
              navigator.mediaSession.setPositionState({duration:dur, playbackRate:1, position:Math.min(cur,dur)});
          }catch(e2){}
        }
        else { $('tCur').textContent=fmtT(cur); $('fpCur').textContent=fmtT(cur); }
      }catch(e){}
    },500);
  }
  function stopProgress(){ if(progressTimer){ clearInterval(progressTimer); progressTimer=null; } }

  $('pbPlay').addEventListener('click', togglePlay);
  $('pbNext').addEventListener('click', function(){ step(1); });
  $('pbPrev').addEventListener('click', function(){ step(-1); });
  $('pbInfo').addEventListener('click', function(){ openFull(); });
  function togglePlay(){
    if(useAudio){
      try{ if(audioEl.paused){ var pr=audioEl.play(); if(pr&&pr.catch) pr.catch(function(){}); } else audioEl.pause(); }catch(e){}
      return;
    }
    if(!playerReady||qi<0) return;
    var s=player.getPlayerState();
    if(s===YT.PlayerState.PLAYING) player.pauseVideo(); else player.playVideo();
  }
  $('fpPlay').addEventListener('click', togglePlay);
  $('fpNext').addEventListener('click', function(){ step(1); });
  $('fpPrev').addEventListener('click', function(){ step(-1); });
  $('fpClose').addEventListener('click', closeFull);
  $('apToggle').addEventListener('click', function(){
    autoplay=!autoplay;
    try{ localStorage.setItem('cxmusik_autoplay', autoplay?'1':'0'); }catch(e){}
    renderApToggle();
  });
  renderApToggle();
  setupMediaSession();
  /* ----- lirik lagu (LRCLIB: gratis, no key, ada timestamp karaoke) ----- */
  var lyricsCache={}, lyricsTrackId=null, lyricsLines=null, lyricsActiveIdx=-1;
  var reduceMotion = ('matchMedia' in window) && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function cleanTitle(t){
    t=(t||'').replace(/\s*[\(\[].*?\)\]\s*$/,''); /* buang (Official Video) dkk di ekor */
    t=t.replace(/\s*[\(\[].*?(official|lyric|lirik|video|audio|\bmv\b|m\/v|visualizer|live|cover|remix|\bhd\b|4k|\bpv\b).*?[\(\)\[\]]?\s*$/i,' ');
    t=t.replace(/\s+\(?\s*(full version|official video|official audio|official mv|lyric video|music video)\s*\)?\s*$/i,''); /* suffix tanpa kurung */
    t=t.replace(/\s*[\|｜].*$/,''); /* buang " | ..." di ekor */
    return t.replace(/\s{2,}/g,' ').trim();
  }
  /* pecah "Artis - Judul" dari judul video; artis dari sini lebih akurat drpd nama channel */
  function splitArtistTitle(title){
    var m=/^(.+?)\s+[-\u2013\u2014:]\s+(.+)$/.exec(title||'');
    if(!m) return null;
    var a=m[1].trim(), ti=m[2].trim();
    if(!a||!ti||a.length>60) return null;
    return {artist:a, title:ti};
  }
  function cleanArtist(a){
    return (a||'').replace(/\s*-\s*Topic$/i,'').replace(/\s*[\(\[].*?[\]\)]\s*/g,' ').replace(/\s{2,}/g,' ').trim()||'YouTube';
  }
  function parseLRC(lrc){
    var out=[];
    String(lrc||'').split('\n').forEach(function(ln){
      var m=/\[(\d+):(\d+(?:\.\d+)?)\](.*)/.exec(ln);
      if(m){ var txt=m[3].trim(); if(txt) out.push({t:parseInt(m[1],10)*60+parseFloat(m[2]), txt:txt}); }
    });
    out.sort(function(a,b){ return a.t-b.t; });
    return out;
  }
  function lrclibGet(artist, title, dur){
    var q='artist_name='+encodeURIComponent(artist)+'&track_name='+encodeURIComponent(title);
    if(dur>0) q+='&duration='+Math.round(dur);
    return fetch('https://lrclib.net/api/get?'+q).then(function(r){ if(!r.ok) throw 0; return r.json(); });
  }
  function lrclibSearchAll(artist, title){
    return fetch('https://lrclib.net/api/search?q='+encodeURIComponent(artist+' '+title))
      .then(function(r){ if(!r.ok) throw 0; return r.json(); })
      .then(function(list){ return list||[]; });
  }
  /* cadangan lirik: API termai.cc (jagonya lagu Indonesia; key publik) */
  var TERMAI_LYRICS_KEY='Bell409';
  function termaiLyrics(artist, title){
    var q=encodeURIComponent(artist+' '+title);
    return fetch('https://api.termai.cc/api/search/lyrics?query='+q+'&key='+TERMAI_LYRICS_KEY)
      .then(function(r){ if(!r.ok) throw 0; return r.json(); })
      .then(function(d){
        if(!d||!d.status||!d.data||!d.data.lyrics) throw 0;
        return d.data;
      });
  }
  /* rapihin hasil mentah (LRCLIB / termai) jadi kandidat lirik */
  function normCand(d, src){
    if(!d) return null;
    var synced=d.syncedLyrics||d.lyrics||'';
    var plain=d.plainLyrics||d.lyrics||'';
    var lines=parseLRC(synced);
    if(!lines.length&&!plain) return null;
    return {src:src, track:d.trackName||d.track_name||'', artist:d.artistName||d.artist_name||'',
            synced:lines.length>0, lines:lines.length?lines:null, plain:plain};
  }
  function dedupeCands(list){
    var seen={}, out=[];
    list.forEach(function(c){
      var k=(c.src+'|'+c.track+'|'+c.artist).toLowerCase(); /* dedupe per sumber: user bisa pilih antar-sumber */
      if(!seen[k]){ seen[k]=c; out.push(c); }
      else if(c.synced&&!seen[k].synced){ out[out.indexOf(seen[k])]=c; seen[k]=c; }
    });
    return out.slice(0,8);
  }
  /* kumpulin kandidat lirik dari semua sumber.
     forceAll=true -> paksa ambil semua (tombol "cari lirik lain") */
  function lyricCandidates(t, forceAll){
    var channelArtist=cleanArtist(t.author);
    var titleC=cleanTitle(t.title);
    var split=splitArtistTitle(titleC);
    var titleOnly=split?split.title:titleC;
    if(!split&&titleOnly.toLowerCase().indexOf(channelArtist.toLowerCase())===0)
      titleOnly=titleOnly.slice(channelArtist.length).replace(/^[\s\-–—:]+/,'').trim();
    var artists=[];
    if(split&&split.artist) artists.push(split.artist);
    if(channelArtist&&(!split||split.artist.toLowerCase()!==channelArtist.toLowerCase())) artists.push(channelArtist);
    if(!artists.length) artists.push('YouTube');
    var artist=artists[0], title=titleOnly;
    function getP(){
      var i=0;
      function attempt(){
        if(i>=artists.length) return Promise.resolve(null);
        var a=artists[i++];
        return lrclibGet(a,title,t.dur||0)
          .then(function(d){ var c=normCand(d,'lrclib'); return c||attempt(); })
          .catch(function(){ return attempt(); });
      }
      return attempt();
    }
    function searchP(){
      return Promise.all([
        lrclibSearchAll(artist,title).catch(function(){ return []; }),
        termaiLyrics(artist,title).then(function(d){ return [d]; }).catch(function(){ return []; })
      ]).then(function(parts){
        var out=[];
        parts[0].forEach(function(r){ var c=normCand(r,'lrclib'); if(c) out.push(c); });
        parts[1].forEach(function(r){ var c=normCand(r,'termai'); if(c) out.push(c); });
        return out;
      });
    }
    if(forceAll){
      return Promise.all([getP(), searchP()]).then(function(pr){
        var list=pr[0]?[pr[0]].concat(pr[1]):pr[1];
        return {picked:null, list:dedupeCands(list)};
      });
    }
    return getP().then(function(c){
      if(c) return {picked:c, list:[]};
      return searchP().then(function(list){
        list=dedupeCands(list);
        return {picked:list.length===1?list[0]:null, list:list};
      });
    });
  }
  function renderLyrics(res){
    var body=$('lyricsBody');
    if(!res){ body.innerHTML='<div class="empty-note">Lirik tidak ditemukan.</div>'; lyricsLines=null; return; }
    if(res.lines&&res.lines.length){
      lyricsLines=res.lines; lyricsActiveIdx=-1;
      body.innerHTML=res.lines.map(function(l,i){
        return '<div class="lyr-line" data-i="'+i+'">'+esc(l.txt)+'</div>';
      }).join('');
    } else {
      lyricsLines=null;
      body.innerHTML='<div class="lyr-plain">'+esc(res.plain||'Lirik tidak ditemukan.')+'</div>';
    }
    var srcEl=document.getElementById('lyricsSrc');
    if(srcEl&&res) srcEl.textContent='Lirik oleh '+res.src.toUpperCase()+(res.track?' \u2022 '+res.track+' \u2014 '+res.artist:'');
  }
  function loadLyrics(t){
    if(!t) return;
    lyricsTrackId=t.id; lyricsLines=null; lyricsActiveIdx=-1;
    $('lyricsSub').textContent=t.title+' \u2014 '+(t.author||'YouTube');
    if(lyricsCache[t.id]!==undefined){ renderLyrics(lyricsCache[t.id]); return; }
    $('lyricsBody').innerHTML='<div class="empty-note">Mencari lirik\u2026</div>';
    lyricCandidates(t,false).then(function(res){
      if(lyricsTrackId!==t.id) return;
      if(res.picked){ lyricsCache[t.id]=res.picked; renderLyrics(res.picked); }
      else if(res.list.length){ renderLyricPicker(res.list); }
      else { lyricsCache[t.id]=null; renderLyrics(null); }
    }).catch(function(){
      if(lyricsTrackId!==t.id) return;
      lyricsCache[t.id]=null; renderLyrics(null);
    });
  }
  var lyricPickList=[];
  function renderLyricPicker(list){
    lyricsLines=null; lyricsActiveIdx=-1;
    lyricPickList=list;
    var body=$('lyricsBody');
    body.innerHTML='<div class="lyr-pick-head">Ditemukan '+list.length+' lirik \u2014 pilih yang cocok:</div>'+
      list.map(function(c,i){
        return '<button class="lyr-pick" data-pi="'+i+'">'+
          '<div class="lyr-pick-title">'+esc(c.track||'Tanpa judul')+'</div>'+
          '<div class="lyr-pick-sub">'+esc(c.artist||'Artis tak dikenal')+' \u2022 '+c.src+(c.synced?' \u2022 karaoke':'')+'</div>'+
        '</button>';
      }).join('');
    body.querySelectorAll('.lyr-pick').forEach(function(b){
      b.addEventListener('click', function(){
        var c=lyricPickList[parseInt(b.dataset.pi,10)]; if(!c) return;
        var t=queue[qi]; if(t) lyricsCache[t.id]=c;
        renderLyrics(c);
      });
    });
  }
  /* tombol kaca pembesar: paksa tampilin semua kandidat (kalo tebakan otomatis salah) */
  function researchLyrics(){
    var t=queue[qi]; if(!t) return;
    lyricsTrackId=t.id; lyricsLines=null; lyricsActiveIdx=-1;
    $('lyricsSub').textContent=t.title+' \u2014 '+(t.author||'YouTube');
    $('lyricsBody').innerHTML='<div class="empty-note">Mencari lirik\u2026</div>';
    lyricCandidates(t,true).then(function(res){
      if(lyricsTrackId!==t.id) return;
      if(res.list.length){ renderLyricPicker(res.list); }
      else { lyricsCache[t.id]=null; renderLyrics(null); }
    }).catch(function(){
      if(lyricsTrackId!==t.id) return;
      renderLyrics(null);
    });
  }
  function syncLyrics(pos){
    if(!lyricsLines||lyricsLines.length===0) return;
    if(!$('lyricsModal').classList.contains('show')) return;
    var idx=-1;
    for(var i=0;i<lyricsLines.length;i++){ if(lyricsLines[i].t<=pos+0.25) idx=i; else break; }
    if(idx===lyricsActiveIdx||idx<0) return;
    lyricsActiveIdx=idx;
    var prev=$('lyricsBody').querySelector('.lyr-line.active');
    if(prev) prev.classList.remove('active');
    var el=$('lyricsBody').querySelector('.lyr-line[data-i="'+idx+'"]');
    if(el){ el.classList.add('active'); el.scrollIntoView({block:'center', behavior:reduceMotion?'auto':'smooth'}); }
  }
  $('fpLyrics').addEventListener('click', function(){
    var t=queue[qi]; if(!t) return;
    boing(this);
    $('lyricsModal').classList.add('show');
    loadLyrics(t);
  });
  $('lyricsClose').addEventListener('click', function(){ $('lyricsModal').classList.remove('show'); });
  $('lyricsResearch').addEventListener('click', researchLyrics);
  $('lyricsModal').addEventListener('click', function(e){ if(e.target===this) this.classList.remove('show'); });
  $('fpQueueBtn').addEventListener('click', function(){ $('queueModal').classList.add('show'); });
  $('queueClose').addEventListener('click', function(){ $('queueModal').classList.remove('show'); });
  $('queueModal').addEventListener('click', function(e){ if(e.target===this) this.classList.remove('show'); });
  function boing(btn){ btn.classList.remove('boing'); void btn.offsetWidth; btn.classList.add('boing'); }
  $('fpLike').addEventListener('click', function(){
    var t=queue[qi]; if(!t) return;
    likeTrack(t); renderFpLike(); boing(this);
  });
  $('fpDislike').addEventListener('click', function(){
    var t=queue[qi]; if(!t) return;
    var i=dislikes.indexOf(t.id);
    if(i>=0) dislikes.splice(i,1);
    else { dislikes.push(t.id); var l=likes.indexOf(t.id); if(l>=0) likes.splice(l,1); }
    saveLib(); renderResults(); renderLibrary(); renderFpLike(); boing(this);
  });
  function bindSeek(el){
    el.addEventListener('click', function(e){
      if(qi<0) return;
      if(!useAudio&&!playerReady) return;
      var r=this.getBoundingClientRect();
      var frac=(e.clientX-r.left)/r.width;
      try{
        if(useAudio){ var d=audioEl.duration||0; if(d>0) doSeek(d*frac); }
        else player.seekTo(player.getDuration()*frac, true);
      }catch(e2){}
    });
  }
  bindSeek($('fpProgress'));
  function skipSec(d){
    if(qi<0) return;
    try{
      if(useAudio){
        var dur=audioEl.duration||0, cur=audioEl.currentTime||0, nd=cur+d;
        if(dur>0&&isFinite(dur)) nd=Math.min(nd,dur);
        doSeek(Math.max(0,nd));
      } else if(playerReady){
        player.seekTo(Math.max(0,player.getCurrentTime()+d), true);
      }
    }catch(e){}
  }
  $('fpBack3').addEventListener('click', function(){ skipSec(-3); });
  $('fpFwd3').addEventListener('click', function(){ skipSec(3); });
  $('vol').addEventListener('input', function(){
    var v=parseInt(this.value,10)||0;
    try{ audioEl.volume=v/100; }catch(e){}
    if(playerReady){ try{ player.setVolume(v); }catch(e){} }
  });
  bindSeek($('pbProgress'));
  qList.addEventListener('click', function(e){
    var el=e.target.closest('[data-q]'); if(el) playAt(parseInt(el.dataset.q,10));
  });

  /* ----- aksi baris lagu ----- */
  document.addEventListener('click', function(e){
    var btn=e.target.closest('[data-act],[data-plpick],[data-hplay],[data-lplay],[data-lunlike],[data-pl],[data-pplay],[data-prm]');
    if(!btn) return;
    var act=btn.dataset.act, ctx;
    if(act){
      var row=btn.closest('.track'); if(!row) return;
      var idx=parseInt(row.dataset.idx,10); ctx=row.dataset.ctx;
      var t = ctx==='r' ? results[idx] : null; if(!t) return;
      if(act==='play'){ playResults(idx); }
      else if(act==='queue'){ queue.push(t); renderQueue(); }
      else if(act==='like'){ likeTrack(t); }
      else if(act==='pl'){ pickerFor = (pickerFor===idx? -1:idx); renderResults(); }
      return;
    }
    if(btn.dataset.plpick!==undefined){
      var name=btn.dataset.plpick;
      if(name==='__new'){ name=prompt('Nama playlist:'); if(!name) return; name=name.trim(); if(!name) return; }
      var t2=results[pickerFor]; if(!t2) return;
      if(!playlists[name]) playlists[name]=[];
      if(playlists[name].every(function(x){ return x.id!==t2.id; })) playlists[name].push({id:t2.id,title:t2.title,author:t2.author,dur:t2.dur,thumb:t2.thumb});
      activePl=name; pickerFor=-1; saveLib(); renderResults(); renderLibrary();
      return;
    }
    if(btn.dataset.hplay!==undefined){ var h=hist[parseInt(btn.dataset.hplay,10)]; if(h) playTrack(h); return; }
    if(btn.dataset.lplay!==undefined){ var lt=findTrack(btn.dataset.lplay); if(lt) playTrack(lt); return; }
    if(btn.dataset.lunlike!==undefined){
      var li=likes.indexOf(btn.dataset.lunlike); if(li>=0) likes.splice(li,1);
      saveLib(); renderResults(); renderLibrary(); return;
    }
    if(btn.dataset.pl!==undefined){ activePl = (activePl===btn.dataset.pl? null:btn.dataset.pl); renderLibrary(); return; }
    if(btn.dataset.pplay!==undefined){ var pt=playlists[activePl][parseInt(btn.dataset.pplay,10)]; if(pt) playTrack(pt); return; }
    if(btn.dataset.prm!==undefined){ playlists[activePl].splice(parseInt(btn.dataset.prm,10),1); saveLib(); renderLibrary(); return; }
  });

  /* ----- tab: animasi menyembul ala /props ----- */
  function popEl(el, cls){ el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
  function showMTab(which){
    var toLib = which==='lib';
    $('tabSearchBtn').classList.toggle('active', !toLib);
    $('tabLibBtn').classList.toggle('active', toLib);
    var showEl = toLib ? $('tabLib') : $('tabSearch');
    var hideEl = toLib ? $('tabSearch') : $('tabLib');
    hideEl.hidden = true;
    showEl.hidden = false;
    popEl(showEl, 'pop');
    if(toLib) renderLibrary();
  }
  $('tabSearchBtn').addEventListener('click', function(){ showMTab('search'); });
  $('tabLibBtn').addEventListener('click', function(){ showMTab('lib'); });

  /* ----- playlist baru ----- */
  $('newPlBtn').addEventListener('click', function(){
    var name=prompt('Nama playlist:'); if(!name) return; name=name.trim(); if(!name) return;
    if(!playlists[name]) playlists[name]=[];
    activePl=name; saveLib(); renderLibrary();
  });

  /* ----- pengaturan key ----- */
  function setStatus(s){ $('apiStatus').textContent=s||''; }
  function setSearchStatus(s){ var el=$('searchStatus'); if(el) el.textContent=s||''; }
  /* ----- pengaturan: notifikasi kalau pencarian standar gangguan ----- */
  function openSettings(){ $('settingsModal').classList.add('show'); }
  function closeSettings(){ $('settingsModal').classList.remove('show'); }
  function showSearchNotif(){ $('searchNotif').classList.add('show'); }
  function hideSearchNotif(){ $('searchNotif').classList.remove('show'); }
  $('settingsBtn').addEventListener('click', openSettings);
  $('settingsClose').addEventListener('click', closeSettings);
  $('settingsModal').addEventListener('click', function(e){ if(e.target===$('settingsModal')) closeSettings(); });
  $('notifClose').addEventListener('click', hideSearchNotif);
  $('notifSettingBtn').addEventListener('click', function(){ openSettings(); });
  try{ $('ytKey').value=localStorage.getItem('cxmusik_ytkey')||''; }catch(e){}
  $('saveKeyBtn').addEventListener('click', function(){
    var v=$('ytKey').value.trim();
    try{ if(v) localStorage.setItem('cxmusik_ytkey',v); else localStorage.removeItem('cxmusik_ytkey'); }catch(e){}
    setStatus(v?'Key tersimpan. Pencarian berikutnya memakai YouTube Data API.':'Key dihapus.');
  });
  $('delKeyBtn').addEventListener('click', function(){
    try{ localStorage.removeItem('cxmusik_ytkey'); }catch(e){}
    $('ytKey').value=''; setStatus('Key dihapus.');
  });
  /* ----- Audio API: sumber audio buat background playback.
     default = API sendiri (jalan di Termux); Vercel paling terakhir ----- */
  var DEFAULT_AUDIO_API='https://copyrighted-prostores-vast-clinics.trycloudflare.com/api/yt-audio';
  var VERCEL_AUDIO_API='https://ytdl-green-zeta.vercel.app/api/yt-audio';
  var BROADCAST_WORKER=''; /* URL Worker broadcast. dikosongin = mati */
  function audioApiUrl(){ try{ var v=localStorage.getItem('cxmusik_audioapi'); return ((v||'')||DEFAULT_AUDIO_API).replace(/\/$/,''); }catch(e){ return DEFAULT_AUDIO_API; } }
  function setAudioApiStatus(s){ var el=$('audioApiStatus'); if(el) el.textContent=s||''; }
  try{ $('audioApi').value=localStorage.getItem('cxmusik_audioapi')||''; }catch(e){}
  $('saveAudioApiBtn').addEventListener('click', function(){
    var v=$('audioApi').value.trim().replace(/\/$/,'');
    try{ if(v) localStorage.setItem('cxmusik_audioapi',v); else localStorage.removeItem('cxmusik_audioapi'); }catch(e){}
    setAudioApiStatus(v?'Audio API kustom tersimpan.':'Kembali ke Audio API bawaan.');
  });
  $('delAudioApiBtn').addEventListener('click', function(){
    try{ localStorage.removeItem('cxmusik_audioapi'); }catch(e){}
    $('audioApi').value=''; setAudioApiStatus('Kembali ke Audio API bawaan.');
  });
  $('testAudioApiBtn').addEventListener('click', function(){
    var base=($('audioApi').value.trim().replace(/\/$/,''))||audioApiUrl();
    if(!base){ setAudioApiStatus('Isi URL-nya dulu.'); return; }
    setAudioApiStatus('Mengetes API\u2026');
    var t0=Date.now();
    var ctrl=('AbortController' in window)?new AbortController():null;
    var timer=ctrl?setTimeout(function(){ ctrl.abort(); },30000):null;
    var q='?id=dQw4w9WgXcQ&url='+encodeURIComponent('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    fetch(base+q, ctrl?{signal:ctrl.signal}:undefined)
      .then(function(r){ if(timer) clearTimeout(timer); if(!r.ok) throw 0; return r.json(); })
      .then(function(d){
        var ok=(d&&(d.status&&d.audioUrl))||(d&&d.formats&&d.formats.length&&pickResaAudio(d));
        if(ok) setAudioApiStatus('OK! Merespons dalam '+((Date.now()-t0)/1000).toFixed(1)+' dtk. Jangan lupa Simpan.');
        else setAudioApiStatus('GAGAL: API tidak mengembalikan audio ('+((d&&d.error)||(d&&d.detail)||'unknown')+').');
      })
      .catch(function(){ if(timer) clearTimeout(timer); setAudioApiStatus('GAGAL: tidak bisa menghubungi API / timeout.'); });
  });

  /* toggle wake lock di pengaturan */
  (function initWakeLock(){
    var b=$('wakeLockBtn'); if(!b) return;
    if(!('wakeLock' in navigator)){ b.disabled=true; setWakeLockStatus('Browser/HP ini tidak mendukung Wake Lock.'); return; }
    renderWakeBtn();
    b.addEventListener('click', function(){
      var on=!wakeLockOn();
      try{ localStorage.setItem('cxmusik_wakelock', on?'1':'0'); }catch(e){}
      renderWakeBtn();
      if(on){ setWakeLockStatus('Aktif. Layar dijaga tetap hidup selama musik diputar.'); acquireWake(); }
      else { setWakeLockStatus('Mati.'); releaseWake(); }
    });
  })();

  /* service worker (PWA): daftarin sw root biar /musik/ bisa di-install sebagai aplikasi */
  if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
      navigator.serviceWorker.register('/sw.js').catch(function(){});
    });
  }

  renderResults(); renderLibrary();

  /* broadcast: pengumuman dari pemilik web */
  (function initBroadcast(){
    var url=(BROADCAST_WORKER||'').replace(/\/$/,'');
    if(!url||!document.body) return;
    var KEY='cxbroadcast_dismissed';
    fetch(url,{cache:'no-store'})
      .then(function(r){ if(!r.ok) throw 0; return r.json(); })
      .then(function(d){
        var msg=((d&&d.message)||'').trim();
        if(!msg) return;
        try{ if(localStorage.getItem(KEY)===String(d.updatedAt)) return; }catch(e){}
        var bar=document.createElement('div');
        bar.className='broadcast-bar'; bar.setAttribute('role','status');
        var icon=document.createElement('i');
        icon.className='fa-solid fa-bullhorn'; icon.setAttribute('aria-hidden','true');
        var txt=document.createElement('span'); txt.textContent=msg;
        var btn=document.createElement('button');
        btn.className='broadcast-close'; btn.setAttribute('aria-label','Tutup pengumuman');
        btn.textContent='\u00d7';
        btn.addEventListener('click',function(){
          try{ localStorage.setItem(KEY,String(d.updatedAt)); }catch(e){}
          bar.remove();
        });
        bar.appendChild(icon); bar.appendChild(txt); bar.appendChild(btn);
        document.body.insertBefore(bar, document.body.firstChild);
      })
      .catch(function(){});
  })();
