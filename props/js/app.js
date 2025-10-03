// Template lengkap untuk build.prop
const template = `## Fringerprint - Custom Props for Android - @ CraXID Project

###
# begin product/etc/build.prop
###

# begin common build properties
ro.product.product.brand={namaBrand}
ro.product.product.device={namaKode}
ro.product.product.manufacturer={pembuat}
ro.product.product.model={model}
ro.product.product.name={namaKode}
ro.product.build.date=Fri Sep  1 12:20:23 UTC 2023
ro.product.build.date.utc=1693570823
ro.product.build.fingerprint={namaBrand}/{namaKode}/{namaKode}:{versiAndroid}/TQ3A.230901.001/10750268:user/release-keys
ro.product.build.id=TQ3A.230901.001
ro.product.build.tags=release-keys
ro.product.build.type=user
ro.mkm=@makima
ro.product.build.version.incremental=10750268
ro.product.build.version.release={versiAndroid}
ro.product.build.version.release_or_codename={versiAndroid}
ro.product.build.version.sdk={versiSDK}
# end common build properties

# begin PRODUCT_PRODUCT_PROPERTIES
ro.support_one_handed_mode=true
ro.charger.enable_suspend=true
ro.opa.eligible_device=true
ro.com.google.ime.bs_theme=true
ro.com.google.ime.theme_id=5
ro.com.google.ime.system_lm_dir=/product/usr/share/ime/google/d3_lms
# end PRODUCT_PRODUCT_PROPERTIES

###
# end product/etc/build.prop
###

###
#-#
###

###
# begin vendor/build.prop
###

# begin common build properties
ro.product.vendor.brand={namaBrand}
ro.product.vendor.device={namaKode}
ro.product.vendor.manufacturer={pembuat}
ro.product.vendor.model={model}
ro.product.vendor.name={namaKode}
ro.vendor.build.date=Fri Sep  1 12:20:23 UTC 2023
ro.vendor.build.date.utc=1693570823
ro.vendor.build.fingerprint={namaBrand}/{namaKode}/{namaKode}:{versiAndroid}/TQ3A.230901.001/10750268:user/release-keys
ro.vendor.build.id=TQ3A.230901.001
ro.vendor.build.tags=release-keys
ro.vendor.build.type=user
ro.vendor.build.version.incremental=10750268
ro.vendor.build.version.release={versiAndroid}
ro.vendor.build.version.release_or_codename={versiAndroid}
ro.vendor.build.version.sdk={versiSDK}
# end common build properties

# begin ADDITIONAL_VENDOR_PROPERTIES
ro.vendor.build.security_patch=2023-09-01
# end ADDITIONAL_VENDOR_PROPERTIES

# begin BOOTIMAGE_build_prop to_system_propERTIES
ro.bootimage.build.date=Fri Sep  1 12:20:23 UTC 2023
ro.bootimage.build.date.utc=1693570823
ro.bootimage.build.fingerprint={namaBrand}/{namaKode}/{namaKode}:{versiAndroid}/TQ3A.230901.001/10750268:user/release-keys
# end BOOTIMAGE_build_prop to_system_propERTIES

# begin PRODUCT_PROPERTY_OVERRIDES
persist.rcs.supported=1
persist.sysui.monet=true
# end PRODUCT_PROPERTY_OVERRIDES

###
# end vendor/build.prop
###

###
#-#
###

###
# begin vendor/odm/etc/build.prop
###

# begin common build properties
ro.product.odm.brand={namaBrand}
ro.product.odm.device={namaKode}
ro.product.odm.manufacturer={pembuat}
ro.product.odm.model={model}
ro.product.odm.name={namaKode}
ro.odm.build.date=Fri Sep  1 12:20:23 UTC 2023
ro.odm.build.date.utc=1693570823
ro.odm.build.fingerprint={namaBrand}/{namaKode}/{namaKode}:{versiAndroid}/TQ3A.230901.001/10750268:user/release-keys
ro.odm.build.id=TQ3A.230901.001
ro.odm.build.tags=release-keys
ro.odm.build.type=user
ro.odm.build.version.incremental=10750268
ro.odm.build.version.release={versiAndroid}
ro.odm.build.version.release_or_codename={versiAndroid}
ro.odm.build.version.sdk={versiSDK}
# end common build properties

###
# end vendor/odm/etc/build.prop
###

###
#-#
###

###
# begin system/system/build.prop
###

# begin common build properties
ro.product.system.brand={namaBrand}
ro.product.system.device={namaKode}
ro.product.system.manufacturer={pembuat}
ro.product.system.model={model}
ro.product.system.name={namaKode}
ro.system.build.date=Fri Sep  1 12:20:23 UTC 2023
ro.system.build.date.utc=1693570823
ro.system.build.fingerprint={namaBrand}/{namaKode}/{namaKode}:{versiAndroid}/TQ3A.230901.001/10750268:user/release-keys
ro.system.build.id=TQ3A.230901.001
ro.system.build.tags=release-keys
ro.system.build.type=user
ro.system.build.version.incremental=10750268
ro.system.build.version.release={versiAndroid}
ro.system.build.version.release_or_codename={versiAndroid}
ro.system.build.version.sdk={versiSDK}
# end common build properties

# begin build properties
ro.build.id=TQ3A.230901.001
ro.build.display.id=TQ3A.230901.001
ro.build.version.incremental=10750268
ro.build.version.sdk={versiSDK}
ro.build.version.release={versiAndroid}
ro.build.version.release_or_codename={versiAndroid}
ro.build.version.security_patch=2023-09-01
ro.build.date=Fri Sep  1 12:20:23 UTC 2023
ro.build.date.utc=1693570823
ro.build.type=user
ro.build.user=android-build
ro.build.host=Maki.TQ3A.230901.001
ro.build.tags=release-keys
ro.build.flavor={namaKode}-user
ro.build.product={namaKode}
ro.build.description={namaKode}-user {versiAndroid} TQ3A.230901.001 10750268 release-keys
# end build properties

# begin extra's from /system/build.prop
ro.build.fingerprint={namaBrand}/{namaKode}/{namaKode}:{versiAndroid}/TQ3A.230901.001/10750268:user/release-keys
ro.product.brand={namaBrand}
ro.product.device={namaKode}
ro.product.manufacturer={pembuat}
ro.product.model={model}
ro.product.name={namaKode}
# end extra's from /system/build.prop

###
# end system/system/build.prop
###

###
#-#
###

###
# begin system_ext/etc/build.prop
###

# begin common build properties
ro.product.system_ext.brand={namaBrand}
ro.product.system_ext.device={namaKode}
ro.product.system_ext.manufacturer={pembuat}
ro.product.system_ext.model={model}
ro.product.system_ext.name={namaKode}
ro.system_ext.build.date=Fri Sep  1 12:20:23 UTC 2023
ro.system_ext.build.date.utc=1693570823
ro.system_ext.build.fingerprint={namaBrand}/{namaKode}/{namaKode}:{versiAndroid}/TQ3A.230901.001/10750268:user/release-keys
ro.system_ext.build.id=TQ3A.230901.001
ro.system_ext.build.tags=release-keys
ro.system_ext.build.type=user
ro.system_ext.build.version.incremental=10750268
ro.system_ext.build.version.release={versiAndroid}
ro.system_ext.build.version.release_or_codename={versiAndroid}
ro.system_ext.build.version.sdk={versiSDK}
# end common build properties

###
# end system_ext/etc/build.prop
###

## Original Project by @T3SL4`;

// Tangani submit form
document.getElementById('propForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Ambil nilai input
  const data = {
    namaBrand:    document.getElementById('namaBrand').value.trim(),
    namaKode:     document.getElementById('namaKode').value.trim(),
    pembuat:      document.getElementById('pembuat').value.trim(),
    model:        document.getElementById('model').value.trim(),
    versiAndroid: document.getElementById('versiAndroid').value.trim(),
    versiSDK:     document.getElementById('versiSDK').value.trim()
  };

  // Ganti placeholder di template system.prop
  let systemProp = template;
  Object.keys(data).forEach(key => {
    const re = new RegExp(`\\{${key}\\}`, 'g');
    systemProp = systemProp.replace(re, data[key]);
  });

  // Buat module.prop
  const moduleProp = `
id=${data.namaKode}_buildprop
name=Custom BuildProp ${data.namaKode} by CraXID Project
version=1.0.0
versionCode=1
author=CraXID Project
description=Auto-generated Magisk/APatch/KernelSU/SukiSU module to override build.prop entries by CraXID Project === https://crax.my.id/
minMagisk=2318
`.trim();

  // Buat service.sh (opsional, harus executable saat flash)
  const serviceSh = `#!/system/bin/sh
# Magisk will auto-apply system.prop
`.trim();

  // Buat ZIP dengan JSZip
  const zip = new JSZip();
  zip.file('system.prop', systemProp);
  zip.file('module.prop', moduleProp);
  zip.file('service.sh', serviceSh);

  const blob = await zip.generateAsync({ type: 'blob' });
  const url  = URL.createObjectURL(blob);

  // Trigger download
  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.namaBrand}_${data.model}_magisk_module_by_CraXID_Project.zip`;
  a.click();
  URL.revokeObjectURL(url);
});
