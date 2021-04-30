using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;

namespace WaProject_React.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TotalDePedidosController : Controller
    {

        [HttpGet]
        public async Task<int> GetAsync()
        {
            var json = "";

            using (var httpClient = new HttpClient())
            {
                using (var request = new HttpRequestMessage(new HttpMethod("GET"), $"https://localhost:44397/TotalDePedidos"))
                {
                    request.Headers.TryAddWithoutValidation("X-Api-Key", "06795D9D-A770-44B9-9B27-03C6ABDB1BAE");

                    var response = await httpClient.SendAsync(request);

                    json = await response.Content.ReadAsStringAsync();

                }
            }

            return JsonConvert.DeserializeObject<int>(json);
        }
    }
}
