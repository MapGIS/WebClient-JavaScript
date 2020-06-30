<%@ WebHandler Language="C#" Class="ZDproxy" Debug="true" %>

using System;
using System.Web;
using System.Net;
using System.IO;
using Microsoft.Win32;

public class ZDproxy : IHttpHandler
{
    
    public void ProcessRequest (HttpContext context) 
    {
        Stream outStream = null;
        HttpWebRequest myHttpWebRequest = null;
        HttpWebResponse myHttpWebResponse = null;
        try
        {
            //string url = Convert.ToString(context.Request.QueryString["url"]);      
            string Indicator="url=";
            string url = context.Request.Url.ToString();
            int index = url.IndexOf(Indicator);
            string urlpar = url.Substring(index + Indicator.Length, (url.Length - index - Indicator.Length));

            myHttpWebRequest = (HttpWebRequest)WebRequest.Create(urlpar);
            myHttpWebRequest.Method = context.Request.HttpMethod;
            WebProxy myProxy = new WebProxy();
            //object localMachProxy = Registry.GetValue("HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings", "ProxyServer", "NOT FOUND");
            //if (localMachProxy != null && localMachProxy.ToString() != "NOT FOUND")
            //{
            //    Uri newUri = new Uri("http://" + localMachProxy.ToString());//设置代理服务器的地址
            //    myProxy.Address = newUri;
            //    object ProxyOverrid = Registry.GetValue("HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings", "ProxyOverride", "NOT FOUND");
            //    if (ProxyOverrid != null && ProxyOverrid.ToString() != "NOT FOUND")
            //    {
            //        myProxy.BypassList = ProxyOverrid.ToString().Split(';');
            //    }
            //    //myHttpWebRequest.Proxy = myProxy;
            //}
            //else
            //{
            //    Uri newUri = new Uri("http://127.0.0.1:1080");//设置代理服务器的地址
            //    myProxy.Address = newUri;
            //   // myHttpWebRequest.Proxy = myProxy;
            //}
            if (context.Request.HttpMethod == "POST")
            {
                myHttpWebRequest.ContentType = "text/plain; charset=utf-8";
                System.IO.Stream requestStream = context.Request.InputStream;
                byte[] requestByts=new byte[requestStream.Length];
                requestStream.Read(requestByts, 0, Convert.ToInt32(requestStream.Length));
                System.IO.Stream myRequestStream = myHttpWebRequest.GetRequestStream();
                myRequestStream.Write(requestByts, 0, Convert.ToInt32(requestStream.Length));
                myRequestStream.Close();
            }
            
            myHttpWebResponse = (HttpWebResponse)myHttpWebRequest.GetResponse();
            outStream = myHttpWebResponse.GetResponseStream();
            StreamReader sr = new StreamReader(outStream);
            context.Response.ContentType = "text/xml";
            context.Response.Write(sr.ReadToEnd());
            
        }
        catch (Exception ex)
        {
            myHttpWebRequest.ContentType="text/xml";
            context.Response.Write("请求失败："+ex.Message);
        }
        finally
        {
            if (outStream != null)
                outStream.Close();
            if (myHttpWebResponse != null)
                myHttpWebResponse.Close();
        }
    }
    
    public bool IsReusable {
        get {
            return false;
        }
    }

}




