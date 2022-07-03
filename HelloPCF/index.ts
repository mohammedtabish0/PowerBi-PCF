import {IInputs, IOutputs} from "./generated/ManifestTypes";

import * as models from 'powerbi-models';
import * as pbi from 'powerbi-client'
import axios from 'axios';
import * as qs from 'qs';
import { contains } from "jquery";


export class HelloPCF implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private adToken:any;
    /**
     * Empty constructor.
     */
    constructor()
    {
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {


        // var data = qs.stringify({
        //     'grant_type': 'client_credentials',
        //     'client_id': 'a14bee2c-eb8b-4f78-ba6d-ae6ba5dc404f',
        //     'client_secret': 'T868Q~J2rLqy_3xnv46mSNt.8nQHTj4-wBTqcbTw',
        //     'resource': 'https://analysis.windows.net/powerbi/api' 
        //   });
        //   var config = {
        //     method: 'post',
        //     url: 'https://login.microsoftonline.com/019a032d-b209-4825-b08b-0c465b5bdd74/oauth2/token',
        //     headers: { 
        //       'Content-Type': 'application/x-www-form-urlencoded', 
        //     },
        //     data : data
        //   };
          
        //   axios(config)
        //   .then(function (response) {
        //     console.log(JSON.stringify(response.data));
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });



        let embedConfiguration = {
            type: 'report',
            accessToken:"H4sIAAAAAAAEACXTt46EBgBF0X_ZFkswZCy5IOfMkDpyzhnL_-6V3d_qPL2_f6zk6ack__nzR0WWKhLfjOXHDbxsZs4wHdK67jy_L5OpBhGcV2y3QiDuMCGXWGzKPWD3O8ZpXO9xO-nudo76VWh9OXIwv2a-JEYSAPvVbBzoq0i6F6qV19UxehVmF1_DCc_7uTrX4r91fkRUz0vGZOTb5Gmzv9R3U63nRIwnZjZWeanUDBZrKDiHlYrNLktB6kEvFuZrNLDxQY7JsvbmOY6NwVOJusIpEwPfkB5aQ6j2utcci-lU0iqStl1Py6GCB6yHk7Hm2KsXgvPVOPLu_ordrIj2cG0csnVrrrKTKN022HQgAYWFazW7ELGSpr-OAJdjTcjwg9qwdN5SCG0wY251cuJSqdqpUAobi-Dab2FvgpebLV5vWQK0R6n0ypTF5vdG0SoUhtL-4EQ1YiyOgdluf7L1Heki1zOyvER8VXUqZJTJHgxcrQBucjABwotqiJ2tfNuWTIIPVgp-2ETO1CRrOagluLUUz_da1AySgUaacMXb0QzjiNB0nbTohn8WAddfETeGG6O_MxL61TLdbMKJ-LJ4hyEmTV3bGi-wM0HDVNfT71aA6qIbmE90dQieipi_9wYcybXOEaxnyCBvdcWu2dewJs2CJ4dToAu5vVLQ9nGT_Eo1qyWR60-uGWmiplptPQcLiDsiUpein0pQlR3eO0LwFu1jucaKfFpKIlphwKX9Lqxy0UuXPGH6sBjShhBQ9Qs4m8qgkKFGWbqWExRneF2VROy9liFbWVWY9e5wEphVvjVOD6B6oD9Noe3nonesjOSkyeeTzCCWX_nW6Avs8O258kkkaCqMgP7rr58_ftj1mfdJLZ7fm1jl_DzuvXjthu2pX14omW6YUqiEf34hZhsUiH82DKcAZJSs4NwcilGftOPwVZiKcS-rZqOkvYc-wLES-uCCh-HfD58r5FmKhNbK1Hc91JhND60jgOijRo5Q83WZS1llTP0sJYRTRh8ZdnPrNImPrym-T295Z65sxp1xlrxHyMIkZ644MD560SNVBB0GDlkJTfrSoinwB9XoMSDmGvd1NMi73WfgLFv9Ai1pIaQ1cwfxFzJiItyVzYp4e_P81xsUpQgI8LystHNKkb-yO0h0vPhdL7EdY7JTCPFcbzIgBnoHk04CXYlwCbNHmgf0qjBnsuoz5ZEvCwaa00U5jbqwZwyC6n_mZ66LVfZ_lS8QoQixz4sX4nYknl6MSJXrv8ptqjHZj7X4zQo2eM6PEb6EuKyNnQPVB3pGtQ1Lmfjssc_qDK_TW3QzeA4YOl0dALWWxLdTL03qEu8BXdp2zLmfXFGAdQPgDUSqci29puV1SbCXlRk5nxDb-urwpVvKg06Yszjr1_r0bP2l6NNGANuNU1XHvmvVOxL0hhyHcUCphi6W4LUlO-7W2g8APUJ9EWuZnzHEUhY_HqNlL162wW-jRBEXZQ-87Jsqsl7egOpdvimhRghuOa36FDNSLIVZrwSYXhyGnpdy7aTmR15JovLMjnEcyjdJqxrA1OKFdjbRLqp0bwHm2ljOgCW6zDR7JAhLmUOD9_ZE0lTwpXcBrmCmummKTjZGaz-a_cv8z79Bp27FGgYAAA==.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6ZmFsc2V9fQ==",
            embedUrl: "https://app.powerbi.com/reportEmbed?reportId=4d4bd9ae-58da-4325-a8e3-152b07622af5&groupId=ffb4d5d3-69a2-4e56-a85b-a5e9e9aaf587&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwiYW5ndWxhck9ubHlSZXBvcnRFbWJlZCI6dHJ1ZSwiY2VydGlmaWVkVGVsZW1ldHJ5RW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlLCJza2lwWm9uZVBhdGNoIjp0cnVlfX0%3d",
            id: "4d4bd9ae-58da-4325-a8e3-152b07622af5",
            tokenType: models.TokenType.Embed,
            permissions: models.Permissions.All,
            viewMode: models.ViewMode.Edit,            
        };
         
        // Get a reference to the HTML element that contains the embedded report.
        let embedContainer = container;
        container.style.height="658px";
        container.style.width="1018px";
         
        // Embed the report.
        let powerbi= new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
        let report = powerbi.embed(embedContainer, embedConfiguration) as pbi.Report;    
        report.switchMode("edit");
    }

    
    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        // Add code to update control view
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
// url -> report1 
// url -> report2


