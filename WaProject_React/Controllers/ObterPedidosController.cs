using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using WaProject_React.Models;

namespace WaProject_React.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ObterPedidosController : Controller
    {
        [HttpGet]
        public async Task<IEnumerable<Pedido>> GetAsync(int pageSize, int pageNum)
        {
            var json = "";

            using (var httpClient = new HttpClient())
            {
                using (var request = new HttpRequestMessage(new HttpMethod("GET"), $"https://localhost:44397/pedidos?pageSize={pageSize}&pageNum={pageNum}"))
                {
                    request.Headers.TryAddWithoutValidation("X-Api-Key", "06795D9D-A770-44B9-9B27-03C6ABDB1BAE");

                    var response = await httpClient.SendAsync(request);

                    json = await response.Content.ReadAsStringAsync();

                }
            }

           return JsonConvert.DeserializeObject<List<Pedido>>(json, new IsoDateTimeConverter() { DateTimeFormat = "yyyy-MM-dd HH:mm" });
        }
    }
}
