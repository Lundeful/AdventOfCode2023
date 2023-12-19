using Xunit.Abstractions;

namespace AdventOfCode2023.Tests.Day00Part00;

public class Day00Part00
{
    private readonly ITestOutputHelper _testOutputHelper;
    private readonly string _currentDirectory;

    public Day00Part00(ITestOutputHelper testOutputHelper)
    {
        _testOutputHelper = testOutputHelper;
        _currentDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Tests", "Day00Part00");
    }

    private static string SolverFunction(string rawInput)
    {
        var lines = rawInput.Split("\n");
        throw new NotImplementedException();
    }

    [Fact]
    public void Solve()
    {
        TestUtils.RunAndVerify(SolverFunction, _currentDirectory);
        TestUtils.RunAndRecord(SolverFunction, _currentDirectory, _testOutputHelper);
    }
}