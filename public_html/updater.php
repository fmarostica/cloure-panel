<?php
    session_start();
    require __DIR__."/api_client/api_client.php";
    $m = new \Marostica\Marostica();

    function unzip($file){
        $zip=zip_open(realpath(".")."/".$file);
        if(!$zip) {return("Unable to proccess file '{$file}'");}

        $e='';

        while($zip_entry=zip_read($zip)) {
            $zdir=dirname(zip_entry_name($zip_entry));
            $zname=zip_entry_name($zip_entry);

            if(!zip_entry_open($zip,$zip_entry,"r")) {$e.="Unable to proccess file '{$zname}'";continue;}
            if(!is_dir($zdir)) mkdirr($zdir,0777);

            #print "{$zdir} | {$zname} \n";

            $zip_fs=zip_entry_filesize($zip_entry);
            if(empty($zip_fs)) continue;

            $zz=zip_entry_read($zip_entry,$zip_fs);

            $z=fopen($zname,"w");
            fwrite($z,$zz);
            fclose($z);
            zip_entry_close($zip_entry);

        }
        zip_close($zip);

        return($e);
    }
        
    function mkdirr($pn,$mode=null) {
        if(is_dir($pn)||empty($pn)) return true;
        $pn=str_replace(array('/', ''),DIRECTORY_SEPARATOR,$pn);

        if(is_file($pn)) {trigger_error('mkdirr() File exists', E_USER_WARNING);return false;}

        $next_pathname=substr($pn,0,strrpos($pn,DIRECTORY_SEPARATOR));
        if(mkdirr($next_pathname,$mode)) {if(!file_exists($pn)) {return mkdir($pn,$mode);} }
        return false;
    }
?>

<html>
    <head>
        <title>MarosticaBiz updater | grupomarostica.com</title>
        <link href="https://fonts.googleapis.com/css?family=Ubuntu+Mono" rel="stylesheet"> 
        <link href="/panel/css/console.css" rel="stylesheet"/>
    </head>
    <body>
        <?php
            echo "MarosticaBiz updater init.";
            echo "<br />Installing files...";
            flush();
            ob_flush();
            
            $url = "https://127.0.0.1/~marosticacom/biz/pdc_1_3_0_2213.zip";
            $zipFile = "zipfile.zip"; // Local Zip File Path
            $zipResource = fopen($zipFile, "w");
            // Get The Zip File From Server
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_FAILONERROR, true);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_AUTOREFERER, true);
            curl_setopt($ch, CURLOPT_BINARYTRANSFER,true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 360);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); 
            curl_setopt($ch, CURLOPT_FILE, $zipResource);
            $page = curl_exec($ch);
            if(!$page) echo "Error :- ".curl_error($ch);
            curl_close($ch);
            
            
            sleep(3);
            flush();
            ob_flush();

            unzip($zipFile);

            /*
            $folder = __DIR__;
            $zip = new \ZipArchive;
            $res = $zip->open('file.zip');
            if ($res === TRUE) {
                $zip->extractTo($folder);
                $zip->close();
                echo 'woot!';
            } else {
                echo 'doh!';
            }
            */
            echo "<br /><br />Job done redirecting...";
            echo '<script>window.setTimeout(function(){ window.location.href = "/panel/"; }, 5000);</script>';
        ?>
    </body>
</html>